import { Schema } from 'datascript';

const schema: Schema = {

  // Actor Attributes
  'person/id': {
    ':db/unique': ':db.unique/identity',
  },
  'person/parents': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/tags': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/attracted_to': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/life_events': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/immediate_family': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/kids': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/sons': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/daughters': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/half_brothers': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/half_sisters': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/nephews': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/sisters': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/brothers': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/nieces': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/siblings': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/grandsons': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/granddaughters': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/cousins': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/aunts': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/uncles': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/grandparents': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/greatgrandparents': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/extended_family': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/sexual_partners': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/acquaintances': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/friends': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/enemies': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/neighbors': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/former_neighbors': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/coworkers': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/former_coworkers': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/occupation': {
    ':db/valueType': ':db.type/ref',
  },
  'person/occupations': {
    ':db/cardinality': ':db.cardinality/many',
    ':db/valueType': ':db.type/ref',
  },
  'person/marriages': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/divorces': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/adoptions': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/moves': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/lay_offs': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'person/name_changes': {
    ':db/cardinality': ':db.cardinality/many',
  },


  // Business Attributes
  'business/employees': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'business/former_employees': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'business/supplemental_vacancies': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'business/people_here_now': {
    ':db/cardinality': ':db.cardinality/many',
  },

  // Event Attributes
  'event/adoptive_parents': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'event/nurses': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'event/builders': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'event/subjects': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'event/children_produced': {
    ':db/cardinality': ':db.cardinality/many',
  },
  'event/name_changes': {
    ':db/cardinality': ':db.cardinality/many',
  },
};

export default schema;
