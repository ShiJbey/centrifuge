import React from "react";
import TrayItem from "./TrayItem";
import {
  EVENT_NODE_COLOR,
  RELATIONSHIP_NODE_COLOR,
  PERSON_NODE_COLOR,
  MODIFIER_NODE_COLOR,
  BUSINESS_NODE_COLOR,
  OCCUPATION_NODE_COLOR,
  SOCIAL_CONN_NODE_COLOR,
  OUTPUT_NODE_COLOR,
  PRIMITIVE_NODE_COLOR,
} from "../../nodes/nodeStyles";
import styles from "./NodeTray.module.scss";
import classNames from "classnames";

const NodeTray: React.FC = () => {
  return (
    <div>
      <div className={classNames(styles.NodeCategoryTitle)}>
        Primitive Nodes
      </div>
      <TrayItem
        model={{ type: "number" }}
        name="Number"
        color={PRIMITIVE_NODE_COLOR}
      />
      <TrayItem
        model={{ type: "string" }}
        name="String"
        color={PRIMITIVE_NODE_COLOR}
      />
      <TrayItem
        model={{ type: "boolean" }}
        name="Boolean"
        color={PRIMITIVE_NODE_COLOR}
      />
      <hr></hr>

      <div className={classNames(styles.NodeCategoryTitle)}>Special Nodes</div>
      <TrayItem
        model={{ type: "output" }}
        name="Variable"
        color={OUTPUT_NODE_COLOR}
      />
      <TrayItem
        model={{ type: "socialConn" }}
        name="Social Connection"
        color={SOCIAL_CONN_NODE_COLOR}
      />
      <hr></hr>

      <div className={classNames(styles.NodeCategoryTitle)}>Entity Nodes</div>
      <TrayItem
        model={{ type: "person" }}
        name="Person"
        color={PERSON_NODE_COLOR}
      />
      <TrayItem
        model={{ type: "relationship" }}
        name="Relationship"
        color={RELATIONSHIP_NODE_COLOR}
      />
      <TrayItem
        model={{ type: "event" }}
        name="Event"
        color={EVENT_NODE_COLOR}
      />
      <TrayItem
        model={{ type: "business" }}
        name="Business"
        color={BUSINESS_NODE_COLOR}
      />
      <TrayItem
        model={{ type: "occupation" }}
        name="Occupation"
        color={OCCUPATION_NODE_COLOR}
      />
      <hr></hr>

      <div className={classNames(styles.NodeCategoryTitle)}>Logical Nodes</div>
      <TrayItem
        model={{ type: "not" }}
        name="NOT"
        color={MODIFIER_NODE_COLOR}
      />
      <TrayItem
        model={{ type: "and" }}
        name="AND"
        color={MODIFIER_NODE_COLOR}
      />
      <TrayItem model={{ type: "or" }} name="OR" color={MODIFIER_NODE_COLOR} />
      <TrayItem
        model={{ type: "orJoin" }}
        name="OR-JOIN"
        color={MODIFIER_NODE_COLOR}
      />
      <TrayItem
        model={{ type: "notJoin" }}
        name="NOT-JOIN"
        color={MODIFIER_NODE_COLOR}
      />
      <hr></hr>

      <div className={classNames(styles.NodeCategoryTitle)}>
        Predicate & Function Nodes
      </div>
      <TrayItem
        model={{ type: "inequality" }}
        name="Inequality"
        color={MODIFIER_NODE_COLOR}
      />
      <TrayItem
        model={{ type: "count" }}
        name="Count"
        color={MODIFIER_NODE_COLOR}
      />
    </div>
  );
};

export default NodeTray;
