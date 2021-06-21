import ds, { Connection } from 'datascript';
import _ from 'lodash';
import { AttributeMap } from '../utils';
import schema from './schema';
import {
  BUSINESS_NAMESPACE,
  EVENT_NAMESPACE,
  OCCUPATION_NAMESPACE,
  PERSON_NAMESPACE,
  RELATIONSHIP_NAMESPACE,
} from './databaseTypes';

/** Append a namespace prefex to all the keys in the object */
function appendNamespace(
  namespace: string,
  entity: AttributeMap
): AttributeMap {
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
export class SimulationDatabase {
  private conn: Connection;

  constructor() {
    this.conn = ds.create_conn(schema);
  }

  reset(): void {
    this.conn = ds.create_conn(schema);
  }

  getPersonEntityIDs(): number[] {
    return ds.q<number>(
      '[:find [?e ...] :where [?e "sim/type" "person"]]',
      ds.db(this.conn)
    );
  }

  getPersonByEntityID(entityID: number): AttributeMap {
    return ds.pull<AttributeMap>(ds.db(this.conn), '[*]', entityID);
  }

  getPersonEntityID(personId: number): number {
    const [person] = ds.q<number>(
      `[
      :find
        [?e]
      :where
				[?e "sim/type" "person"]
        [?e "person/id" ${personId}]
      ]`,
      ds.db(this.conn)
    );
    return person;
  }

  addAttribute(entityID: number, attrName: string, value: any): void {
    ds.transact(this.conn, [[':db/add', entityID, attrName, value]]);
  }

  addTag(persons: number[], tag: string): void {
    persons.forEach((entityID) => {
      const tags = ds.pull(ds.db(this.conn), '["person/tags"]', entityID)[
        'person/tags'
      ];
      tags.push(tag);
      ds.transact(this.conn, [[':db/add', entityID, 'person/tags', tags]]);
    });
  }

  query<T = any>(queryStr: string, rules?: string): T[] {
    if (rules) {
      return ds.q<T>(queryStr, ds.db(this.conn), rules);
    }
    return ds.q<T>(queryStr, ds.db(this.conn));
  }

  insertPerson(person: AttributeMap) {
    const modifiedPerson = appendNamespace(PERSON_NAMESPACE, person);
    modifiedPerson[':db/id'] = -1;
    modifiedPerson['sim/type'] = 'person';

    delete modifiedPerson['person/personality']

    modifiedPerson['person/friend_count'] = person['friends'].length;
    modifiedPerson['person/enemy_count'] = person['enemies'].length;
    modifiedPerson['person/sexual_partners_count'] = person['sexual_partners'].length;

    // Flatten the person's personality object
    modifiedPerson['person/personality/openness'] = person['personality']['openness_to_experience']
    modifiedPerson['person/personality/conscientiousness'] = person['personality']['conscientiousness']
    modifiedPerson['person/personality/extroversion'] = person['personality']['extroversion']
    modifiedPerson['person/personality/agreeableness'] = person['personality']['agreeableness']
    modifiedPerson['person/personality/neuroticism'] = person['personality']['neuroticism']
    modifiedPerson['person/personality/high_o'] = person['personality']['high_o']
    modifiedPerson['person/personality/low_o'] = person['personality']['low_o']
    modifiedPerson['person/personality/high_c'] = person['personality']['high_c']
    modifiedPerson['person/personality/low_c'] = person['personality']['low_c']
    modifiedPerson['person/personality/high_e'] = person['personality']['high_e']
    modifiedPerson['person/personality/low_e'] = person['personality']['low_e']
    modifiedPerson['person/personality/high_a'] = person['personality']['high_a']
    modifiedPerson['person/personality/low_a'] = person['personality']['low_a']
    modifiedPerson['person/personality/high_n'] = person['personality']['high_n']
    modifiedPerson['person/personality/low_n'] = person['personality']['low_n']
    modifiedPerson['person/personality/interest_in_history'] = person['personality']['interest_in_history']

    // add the occupations to the database
    if (modifiedPerson['person/occupations'] && modifiedPerson['person/occupations'].length) {
      const occupations = (modifiedPerson['person/occupations'] as AttributeMap[]).map((occupation, index) => {
        const modifiedOcc = appendNamespace(OCCUPATION_NAMESPACE, occupation);
        modifiedOcc[':db/id'] = -1 * (index + 1);
        modifiedOcc['sim/type'] = 'occupation';
        return modifiedOcc;
      });

      const tx_report = ds.transact(this.conn, occupations);

      // get the entity IDs from the transaction report
      const occupationIDs = _.range(1, occupations.length + 1).map(x => tx_report.tempids[`${-1 * x}`]);

      modifiedPerson['person/occupations'] = occupationIDs;

      // Do not set the reference if the occupation is just an empty object
      if (Object.keys(modifiedPerson['person/occupation']).length) {
        modifiedPerson['person/occupation'] = occupationIDs[occupationIDs.length - 1];
      }
    }

    // add the relationships to the database
    if (modifiedPerson['person/relationships']) {
      const relationships = Object.values(modifiedPerson['person/relationships'] as AttributeMap[]).map((relationship, index) => {
        const relationshipEntity = appendNamespace(RELATIONSHIP_NAMESPACE, relationship);
        relationshipEntity[':db/id'] = -1 * (index + 1);
        relationshipEntity['sim/type'] = 'relationship';
        return relationshipEntity;
      });

      const tx_report = ds.transact(this.conn, relationships);

      // get the entity IDs from the transaction report
      const relationshipIDs = _.range(1, relationships.length + 1).map(x => tx_report.tempids[`${-1 * x}`]);

      modifiedPerson['person/relationships'] = relationshipIDs;
    }

    return ds.transact(this.conn, [modifiedPerson]).tempids['-1'];
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

		// console.log(`${people.length} people found`);
    for (const person of people) {
      // Get additional attributes before modifying object for database
      const id = person.id;
      const resident = sim.town.residents.includes(person.id);
      const settler = sim.town.settlers.includes(person.id);
      const deceased = sim.town.deceased.includes(person.id);
      const departed = sim.town.departed.includes(person.id);

      const personEntity = this.insertPerson(person);

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
    const events = Object.values<AttributeMap>(sim.events);
    // console.log(`${events.length} events found`);
    for (const event of events) {
      this.insertEvent(event);
    }

    // Load current businesses locations
    const businesses = sim.town.businesses;
    // console.log(`${businesses.length} businesses found`);
    for (const businessID of businesses) {
      const business = sim.town.places[`${businessID}`];
      this.insertBusiness(business);
    }

    const formerBusinesses = sim.town.former_businesses;
    // console.log(`${formerBusinesses.length} former businesses found`);
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
