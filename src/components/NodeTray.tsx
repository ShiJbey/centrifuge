import React from 'react';
import TrayWidget from './TrayWidget';
import TrayWidgetItem from './TrayWidgetItem';
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
} from '../utility/constants';

const NodeTray: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        height: '100%',
        background: 'hsl(0, 0%, 12.549019607843137%)',
        zIndex: 100,
        overflow: 'hidden',
        overflowY: 'auto',
        color: 'white',
      }}
    >
      <TrayWidget>
        <h3 className="text-center">Primitives</h3>
        <TrayWidgetItem
          model={{ type: 'variable' }}
          name="Variable Node"
          color={VARIABLE_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'number' }}
          name="Number Node"
          color={NUMBER_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'string' }}
          name="String Node"
          color={STRING_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'boolean' }}
          name="Boolean Node"
          color={BOOL_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'modifier' }}
          name="Modifier Node"
          color={MODIFIER_NODE_COLOR}
        />
        <h3 className="text-center">Entities</h3>
        <TrayWidgetItem
          model={{ type: 'person' }}
          name="Person Node"
          color={PERSON_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'relationship' }}
          name="Relationship Node"
          color={RELATIONSHIP_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'event' }}
          name="Event Node"
          color={EVENT_NODE_COLOR}
        />
        <h3 className="text-center">Patterns</h3>
        <TrayWidgetItem
          model={{ type: 'asymmetric-friendship' }}
          name="Asymmetric Friendship"
          color={ASYMMETRIC_FRIENDSHIP_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'love-triangle' }}
          name="Love Triangle"
          color={LOVE_TRIANGLE_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'business-rivalry' }}
          name="Business Rivalry"
          color={BUSINESS_RIVALRY_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'jealous-uncle' }}
          name="Jealous Uncle"
          color={JEALOUS_UNCLE_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'likes' }}
          name="Likes Node"
          color={LIKES_NODE_COLOR}
        />
        <TrayWidgetItem
          model={{ type: 'dislikes' }}
          name="Dislikes Node"
          color={DISLIKES_NODE_COLOR}
        />
      </TrayWidget>
    </div>
  );
};

export default NodeTray;
