import React from 'react';
import TrayItem from './TrayItem';
import {
    EVENT_NODE_COLOR,
    RELATIONSHIP_NODE_COLOR,
    PERSON_NODE_COLOR,
    MODIFIER_NODE_COLOR,
    BUSINESS_NODE_COLOR,
    OCCUPATION_NODE_COLOR,
    SOCIAL_CONN_NODE_COLOR,
    VARIABLE_NODE_COLOR,
    PRIMITIVE_NODE_COLOR,
} from '../../nodes/nodeStyles';
import { PERSON_NODE_TYPE } from '../../nodes/PersonNode';
import { SOCIAL_CONN_NODE_TYPE } from '../../nodes/SocialConnNode';
import { BOOL_NODE_TYPE } from '../../nodes/BoolNode';
import { NUMBER_NODE_TYPE } from '../../nodes/NumberNode';
import { STRING_NODE_TYPE } from '../../nodes/StringNode';
import { BUSINESS_NODE_TYPE } from '../../nodes/BusinessNode';
import { EVENT_NODE_TYPE } from '../../nodes/EventNode';
import { RELATIONSHIP_NODE_TYPE } from '../../nodes/RelationshipNode';
import { VARIABLE_NODE_TYPE } from '../../nodes/VariableNode';
import { OCCUPATION_NODE_TYPE } from '../../nodes/OccupationNode';
import { NOT_NODE_TYPE } from '../../nodes/NotNode';
import { AND_NODE_TYPE } from '../../nodes/AndNode';
import { OR_JOIN_NODE_TYPE } from '../../nodes/OrJoinNode';
import { NOT_JOIN_NODE_TYPE } from '../../nodes/NotJoinNode';
import { RANGE_PREDICATE_NODE_TYPE } from '../../nodes/RangePredicateNode';
import { COUNT_NODE_TYPE } from '../../nodes/CountNode';
import { OR_NODE_TYPE } from '../../nodes/OrNode';
import styles from './NodeTray.module.scss';

const NodeTray: React.FC = () => {
    return (
        <div>
            <div className={styles.NodeCategoryTitle}>Primitive Nodes</div>

            <TrayItem
                model={{ type: NUMBER_NODE_TYPE }}
                name="Number"
                color={PRIMITIVE_NODE_COLOR}
            />

            <TrayItem
                model={{ type: STRING_NODE_TYPE }}
                name="String"
                color={PRIMITIVE_NODE_COLOR}
            />

            <TrayItem
                model={{ type: BOOL_NODE_TYPE }}
                name="Boolean"
                color={PRIMITIVE_NODE_COLOR}
            />

            <hr></hr>
            <div className={styles.NodeCategoryTitle}>Special Nodes</div>

            <TrayItem
                model={{ type: VARIABLE_NODE_TYPE }}
                name="Variable"
                color={VARIABLE_NODE_COLOR}
            />

            <TrayItem
                model={{ type: SOCIAL_CONN_NODE_TYPE }}
                name="Social Connection"
                color={SOCIAL_CONN_NODE_COLOR}
            />

            <hr></hr>
            <div className={styles.NodeCategoryTitle}>Entity Nodes</div>

            <TrayItem
                model={{ type: PERSON_NODE_TYPE }}
                name="Person"
                color={PERSON_NODE_COLOR}
            />

            <TrayItem
                model={{ type: RELATIONSHIP_NODE_TYPE }}
                name="Relationship"
                color={RELATIONSHIP_NODE_COLOR}
            />

            <TrayItem
                model={{ type: EVENT_NODE_TYPE }}
                name="Event"
                color={EVENT_NODE_COLOR}
            />

            <TrayItem
                model={{ type: BUSINESS_NODE_TYPE }}
                name="Business"
                color={BUSINESS_NODE_COLOR}
            />

            <TrayItem
                model={{ type: OCCUPATION_NODE_TYPE }}
                name="Occupation"
                color={OCCUPATION_NODE_COLOR}
            />

            <hr></hr>
            <div className={styles.NodeCategoryTitle}>Logical Nodes</div>

            <TrayItem
                model={{ type: NOT_NODE_TYPE }}
                name="NOT"
                color={MODIFIER_NODE_COLOR}
            />

            <TrayItem
                model={{ type: AND_NODE_TYPE }}
                name="AND"
                color={MODIFIER_NODE_COLOR}
            />

            <TrayItem
                model={{ type: OR_NODE_TYPE }}
                name="OR"
                color={MODIFIER_NODE_COLOR}
            />

            <TrayItem
                model={{ type: OR_JOIN_NODE_TYPE }}
                name="OR-JOIN"
                color={MODIFIER_NODE_COLOR}
            />

            <TrayItem
                model={{ type: NOT_JOIN_NODE_TYPE }}
                name="NOT-JOIN"
                color={MODIFIER_NODE_COLOR}
            />

            <hr></hr>
            <div className={styles.NodeCategoryTitle}>
                Predicate & Function Nodes
            </div>

            <TrayItem
                model={{ type: RANGE_PREDICATE_NODE_TYPE }}
                name="Inequality"
                color={MODIFIER_NODE_COLOR}
            />

            <TrayItem
                model={{ type: COUNT_NODE_TYPE }}
                name="Count"
                color={MODIFIER_NODE_COLOR}
            />
        </div>
    );
};

export default NodeTray;
