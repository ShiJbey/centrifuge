import React from 'react';
import TrayItem from './TrayItem';
import {
    MODIFIER_NODE_COLOR,
    SOCIAL_CONN_NODE_COLOR,
    VARIABLE_NODE_COLOR,
    PRIMITIVE_NODE_COLOR,
} from '../../nodes/nodeStyles';
import { SOCIAL_CONN_NODE_TYPE } from '../../nodes/SocialConnNode';
import { ValueNodeConfig, VALUE_NODE_TYPE } from '../../nodes/ValueNode';
import { VARIABLE_NODE_TYPE } from '../../nodes/VariableNode';
import { LOGICAL_JOIN_NODE_TYPE } from '../../nodes/LogicalJoinNode';
import { RANGE_PREDICATE_NODE_TYPE } from '../../nodes/RangePredicateNode';
import { COUNT_NODE_TYPE } from '../../nodes/CountNode';
import styles from './NodeTray.module.scss';
import { LOGICAL_NODE_TYPE } from 'src/nodes/LogicalNode';
import { ENTITY_NODE_TYPE } from 'src/nodes/EntityNode';
import { enity_node_configs } from 'src/nodes/entity_nodes';

const NodeTray: React.FC = () => {
    return (
        <div>
            <div className={styles.NodeCategoryTitle}>Primitive Nodes</div>

            <TrayItem
                model={{
                    type: VALUE_NODE_TYPE,
                    config: { value: 0 } as ValueNodeConfig,
                }}
                name="Number"
                color={PRIMITIVE_NODE_COLOR}
            />

            <TrayItem
                model={{
                    type: VALUE_NODE_TYPE,
                    config: { value: '' } as ValueNodeConfig,
                }}
                name="String"
                color={PRIMITIVE_NODE_COLOR}
            />

            <TrayItem
                model={{
                    type: VALUE_NODE_TYPE,
                    config: { value: true } as ValueNodeConfig,
                }}
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

            {Object.keys(enity_node_configs).map((name, index) => {
                return (
                    <TrayItem
                        key={`entity_node_item_${index}`}
                        model={{
                            type: ENTITY_NODE_TYPE,
                            config: enity_node_configs[name],
                        }}
                        name={name}
                        color={enity_node_configs[name].color}
                    />
                );
            })}

            <hr></hr>
            <div className={styles.NodeCategoryTitle}>Logical Nodes</div>

            <TrayItem
                model={{ type: LOGICAL_NODE_TYPE, config: { op: 'not' } }}
                name="NOT"
                color={MODIFIER_NODE_COLOR}
            />

            <TrayItem
                model={{ type: LOGICAL_NODE_TYPE, config: { op: 'and' } }}
                name="AND"
                color={MODIFIER_NODE_COLOR}
            />

            <TrayItem
                model={{ type: LOGICAL_NODE_TYPE, config: { op: 'or' } }}
                name="OR"
                color={MODIFIER_NODE_COLOR}
            />

            <TrayItem
                model={{
                    type: LOGICAL_JOIN_NODE_TYPE,
                    config: { op: 'or-join' },
                }}
                name="OR-JOIN"
                color={MODIFIER_NODE_COLOR}
            />

            <TrayItem
                model={{
                    type: LOGICAL_JOIN_NODE_TYPE,
                    config: { op: 'not-join' },
                }}
                name="NOT-JOIN"
                color={MODIFIER_NODE_COLOR}
            />

            <hr></hr>
            <div className={styles.NodeCategoryTitle}>
                Predicate & Function Nodes
            </div>

            <TrayItem
                model={{ type: RANGE_PREDICATE_NODE_TYPE }}
                name="Range"
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
