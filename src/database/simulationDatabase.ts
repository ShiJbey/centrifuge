import ds, { Connection } from 'datascript';
import _ from 'lodash';
import AttributeMap from '../utility/models/attributeMap';
import schema from './schema';
import { BUSINESS_NAMESPACE, EVENT_NAMESPACE, OCCUPATION_NAMESPACE, PERSON_NAMESPACE, RELATIONSHIP_NAMESPACE } from './databaseTypes';

/** Append a namespace prefex to all the keys in the object */
function appendNamespace(namespace: string, entity: AttributeMap): AttributeMap {
  const modifiedEntity: AttributeMap = {};
  for (const attr of Object.keys(entity)) {
    modifiedEntity[`${namespace}/${attr}`] = entity[attr];
  }
  return modifiedEntity;
}

/**
 * Wraps arround a datascript instance providing helper functions for inspecting
 * the datascript database
 */
class SimulationDatabase {

  private conn: Connection;

  constructor() {
    this.conn = ds.create_conn(schema);
  }

  reset(): void {
    this.conn = ds.create_conn(schema);
  }

  getPersonEntityIDs(): number[] {
    return ds.q<number>('[:find [?e ...] :where [?e "sim/type" "person"]]', ds.db(this.conn));
  }

  getPersonByEntityID(entityID: number): AttributeMap {
    return ds.pull<AttributeMap>(ds.db(this.conn), '[*]', entityID);
  }

  getPersonEntityID(personId: number): number {
    const [person] = ds.q<number>(`[
      :find
        [?e]
      :where
        [?e "sim/type" "person"]
        [?e "person/id" ${personId}]
      ]`,
      ds.db(this.conn));
    return person;
  }

  addAttribute(entityID: number, attrName: string, value: any): void {
    ds.transact(this.conn, [[":db/add", entityID, attrName, value]]);
  }

  addTag(persons: number[], tag: string): void {
    persons.forEach(entityID => {
      const tags = ds.pull(ds.db(this.conn), '["person/tags"]', entityID)['person/tags'];
      tags.push(tag);
      ds.transact(this.conn, [[":db/add", entityID, "person/tags", tags]]);
    });
  }

  query<T = any>(queryStr: string, rules: string): T[] {
    if (rules) {
      return ds.q<T>(queryStr, ds.db(this.conn), rules);
    }
    return ds.q<T>(queryStr, ds.db(this.conn));
  }

  insertPerson(person: AttributeMap): void {
    const modifiedPerson = appendNamespace(PERSON_NAMESPACE, person);

    person['sim/type'] = 'person';

    // add the occupations to the database
    if (modifiedPerson['person/occupations'] && modifiedPerson['person/occupations'].length) {
      const occupations = (person['person/occupations'] as AttributeMap[]).map((occupation, index) => {
        appendNamespace(OCCUPATION_NAMESPACE, occupation);
        occupation[':db/id'] = -1 * (index + 1);
        occupation['sim/type'] = 'occupation';
        return occupation;
      });

      const tx_report = ds.transact(this.conn, occupations);

      // get the entity IDs from the transaction report
      const occupationIDs = _.range(1, occupations.length + 1).map(x => tx_report.tempids[`${-1 * x}`]);

      person['person/occupations'] = occupationIDs;

      // Do not set the reference if the occupation is just an empty object
      if (Object.keys(person['person/occupation']).length) {
        person['person/occupation'] = occupationIDs[occupationIDs.length - 1];
      }
    }

    // add the relationships to the database
    if (modifiedPerson['person/relationships']) {
      const relationships = Object.values<AttributeMap>(person['person/relationships']).map((relationship, index) => {
        appendNamespace(RELATIONSHIP_NAMESPACE, relationship);
        relationship[':db/id'] = -1 * (index + 1);
        relationship['sim/type'] = 'relationship';
        return relationship;
      });

      const tx_report = ds.transact(this.conn, relationships);

      // get the entity IDs from the transaction report
      const relationshipIDs = _.range(1, relationships.length + 1).map(x => tx_report.tempids[`${-1 * x}`]);

      person['person/relationships'] = relationshipIDs;
    }

    ds.transact(this.conn, [person]);
  }

  insertBusiness(business: AttributeMap): void {
    const businessEntity = appendNamespace(BUSINESS_NAMESPACE, business);
    businessEntity['sim/type'] = 'business';
    ds.transact(this.conn, [businessEntity]);
  }

  insertEvent(event: AttributeMap): void {
    const eventEntity = appendNamespace(EVENT_NAMESPACE, event);
    eventEntity['sim/type'] = 'event';
    ds.transact(this.conn, [eventEntity]);
  }

  loadTalkOfTheTown(sim: AttributeMap): void {
    const people = Object.values<AttributeMap>(sim.town.people);

    for (const person of people) {
      // Get additional attributes before modifying object for database
      const id = person.id;
      const resident = sim.town.residents.includes(person.id);
      const settler = sim.town.settlers.includes(person.id);
      const deceased = sim.town.deceased.includes(person.id);
      const departed = sim.town.departed.includes(person.id);

      this.insertPerson(person);

      const personEntity = this.getPersonEntityID(id);

      if (resident) {
        this.addAttribute(personEntity, 'person/resident', true);
      }

      if (settler) {
        this.addAttribute(personEntity, 'person/settler', true);
      }

      if (deceased) {
        this.addAttribute(personEntity, 'person/deceased', true);
      }

      if (departed) {
        this.addAttribute(personEntity, 'person/departed', true);
      }
    }

    // load events
    const events = Object.values(sim.events);
    console.log(`${events.length} events found`);
    for (const event of events) {
      this.insertEvent(event);
    }

    // Load current businesses locations
    const businesses = sim.town.businesses;
    console.log(`${businesses.length} businesses found`);
    for (const businessID of businesses) {
      const business = sim.town.places[`${businessID}`];
      this.insertBusiness(business);
    }

    const formerBusinesses = sim.town.former_businesses;
    console.log(`${formerBusinesses.length} former businesses found`);
    for (const businessID of formerBusinesses) {
      const business = sim.town.places[`${businessID}`];
      this.insertBusiness(business);
    }
  }

  toString(): string {
    let ret = '';
    const personIDs = this.getPersonEntityIDs();
    for (const id of personIDs) {
      ret += JSON.stringify(ds.pull(ds.db(this.conn), '[*]', id)) + '\n';
    }
    return ret;
  }
}

export default SimulationDatabase;
