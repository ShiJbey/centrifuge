import React from 'react';
import TrayItem from './TrayItem';
import {
  ASYMMETRIC_FRIENDSHIP_NODE_COLOR,
  EVENT_NODE_COLOR,
  RELATIONSHIP_NODE_COLOR,
  PERSON_NODE_COLOR,
  LOVE_TRIANGLE_NODE_COLOR,
  BUSINESS_RIVALRY_NODE_COLOR,
  JEALOUS_UNCLE_NODE_COLOR,
  LIKES_NODE_COLOR,
  DISLIKES_NODE_COLOR,
  VARIABLE_NODE_COLOR,
  NUMBER_NODE_COLOR,
  STRING_NODE_COLOR,
  BOOL_NODE_COLOR,
  MODIFIER_NODE_COLOR,
} from '../../utility/constants';
// import styles from './NodeTray.module.scss';

const NodeTray: React.FC = () => {
  return (
    <div>
      <h3 className="text-center">Primitives</h3>
      <TrayItem
        model={{ type: 'variable' }}
        name="Variable Node"
        color={VARIABLE_NODE_COLOR}
      />
      <TrayItem
        model={{ type: 'number' }}
        name="Number Node"
        color={NUMBER_NODE_COLOR}
      />
      <TrayItem
        model={{ type: 'string' }}
        name="String Node"
        color={STRING_NODE_COLOR}
      />
      <TrayItem
        model={{ type: 'boolean' }}
        name="Boolean Node"
        color={BOOL_NODE_COLOR}
      />
      <TrayItem
        model={{ type: 'modifier' }}
        name="Modifier Node"
        color={MODIFIER_NODE_COLOR}
      />
      <hr></hr>
      <h3 className="text-center">Entities</h3>
      <TrayItem
        model={{ type: 'person' }}
        name="Person Node"
        color={PERSON_NODE_COLOR}
      />
      <TrayItem
        model={{ type: 'relationship' }}
        name="Relationship Node"
        color={RELATIONSHIP_NODE_COLOR}
      />
      <TrayItem
        model={{ type: 'event' }}
        name="Event Node"
        color={EVENT_NODE_COLOR}
      />
      {/* <h3 className="text-center">Patterns</h3>
        <TrayItem
          model={{ type: 'asymmetric-friendship' }}
          name="Asymmetric Friendship"
          color={ASYMMETRIC_FRIENDSHIP_NODE_COLOR}
        />
        <TrayItem
          model={{ type: 'love-triangle' }}
          name="Love Triangle"
          color={LOVE_TRIANGLE_NODE_COLOR}
        />
        <TrayItem
          model={{ type: 'business-rivalry' }}
          name="Business Rivalry"
          color={BUSINESS_RIVALRY_NODE_COLOR}
        />
        <TrayItem
          model={{ type: 'jealous-uncle' }}
          name="Jealous Uncle"
          color={JEALOUS_UNCLE_NODE_COLOR}
        />
        <TrayItem
          model={{ type: 'likes' }}
          name="Likes Node"
          color={LIKES_NODE_COLOR}
        />
        <TrayItem
          model={{ type: 'dislikes' }}
          name="Dislikes Node"
          color={DISLIKES_NODE_COLOR}
        /> */}
    </div>
  );
};

export default NodeTray;
