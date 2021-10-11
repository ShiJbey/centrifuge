import { EntityNodeConfig } from './EntityNode';
import {
    BUSINESS_NODE_COLOR,
    EVENT_NODE_COLOR,
    OCCUPATION_NODE_COLOR,
    PERSON_NODE_COLOR,
    RELATIONSHIP_NODE_COLOR,
} from './nodeStyles';

export const enity_node_configs: { [key: string]: EntityNodeConfig } = {
    Person: {
        color: PERSON_NODE_COLOR,
        entityType: 'person',
        attributes: [
            { name: 'name', label: 'Name', datatype: 'string' },
            { name: 'age', label: 'Age', datatype: 'number' },
            {
                name: 'gender',
                label: 'Gender',
                datatype: 'string',
                cardinality: 'many',
            },
            {
                name: 'tags',
                label: 'Tags',
                datatype: 'string',
                cardinality: 'many',
            },
            { name: 'alive', label: 'Alive', datatype: 'boolean' },
            {
                name: 'occupation',
                label: 'Current Occupation',
                datatype: 'ref',
            },
            {
                name: 'former_occupations',
                label: 'Former Occupations',
                datatype: 'ref',
                cardinality: 'many',
            },
        ],
    },
    Business: {
        color: BUSINESS_NODE_COLOR,
        entityType: 'business',
        attributes: [
            { name: 'type', label: 'Business Type', datatype: 'string' },
            {
                name: 'services',
                label: 'Services Offered',
                datatype: 'string',
                cardinality: 'many',
            },
            { name: 'owner', label: 'Owner', datatype: 'ref' },
            {
                name: 'employees',
                label: 'Employees',
                datatype: 'ref',
                cardinality: 'many',
            },
            {
                name: 'former_owners',
                label: 'Former Owners',
                datatype: 'ref',
                cardinality: 'many',
            },
            {
                name: 'former_employees',
                label: 'Former Employees',
                datatype: 'ref',
                cardinality: 'many',
            },
            {
                name: 'out_of_business',
                label: 'Out of Business',
                datatype: 'boolean',
            },
        ],
    },
    Event: {
        color: EVENT_NODE_COLOR,
        entityType: 'event',
        attributes: [
            { name: 'type', label: 'Event Type', datatype: 'string' },
            { name: 'timestamp', label: 'Time Stamp', datatype: 'string' },
            {
                name: 'subjects',
                label: 'Subject(s)',
                datatype: 'ref',
                cardinality: 'many',
            },
            { name: 'type', label: 'Event Type', datatype: 'string' },
        ],
    },
    Occupation: {
        color: OCCUPATION_NODE_COLOR,
        entityType: 'occupation',
        attributes: [
            { name: 'type', label: 'Occupation Type', datatype: 'string' },
            { name: 'person', label: 'Person', datatype: 'ref' },
            {
                name: 'business',
                label: 'Business',
                datatype: 'ref',
            },
            { name: 'shift', label: 'Shift', datatype: 'string' },
            { name: 'level', label: 'Level', datatype: 'number' },
        ],
    },
    Relationship: {
        color: RELATIONSHIP_NODE_COLOR,
        entityType: 'relationship',
        attributes: [
            { name: 'type', label: 'Relationship Type', datatype: 'string' },
            { name: 'subject', label: 'Subject', datatype: 'ref' },
            { name: 'person', label: 'Other Person', datatype: 'ref' },
            { name: 'charge', label: 'Charge', datatype: 'ref' },
            { name: 'spark', label: 'Spark', datatype: 'ref' },
        ],
    },
};
