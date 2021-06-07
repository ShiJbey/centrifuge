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
	OUTPUT_NODE_COLOR,
	PRIMITIVE_NODE_COLOR,
} from '../../nodes/nodeStyles';
// import styles from './NodeTray.module.scss';

const NodeTray: React.FC = () => {
	return (
		<div>
			<h3 className="text-center">Primitives</h3>
			<TrayItem model={{ type: 'variable' }} name="Variable Node" color={PRIMITIVE_NODE_COLOR} />
			<TrayItem model={{ type: 'number' }} name="Number Node" color={PRIMITIVE_NODE_COLOR} />
			<TrayItem model={{ type: 'string' }} name="String Node" color={PRIMITIVE_NODE_COLOR} />
			<TrayItem model={{ type: 'boolean' }} name="Boolean Node" color={PRIMITIVE_NODE_COLOR} />
			<TrayItem model={{ type: 'output' }} name="Output Node" color={OUTPUT_NODE_COLOR} />
			<hr></hr>
			<h3 className="text-center">Entities</h3>
			<TrayItem model={{ type: 'person' }} name="Person Node" color={PERSON_NODE_COLOR} />
			<TrayItem
				model={{ type: 'relationship' }}
				name="Relationship Node"
				color={RELATIONSHIP_NODE_COLOR}
			/>
			<TrayItem model={{ type: 'event' }} name="Event Node" color={EVENT_NODE_COLOR} />
			<TrayItem model={{ type: 'business' }} name="Business Node" color={BUSINESS_NODE_COLOR} />
			<TrayItem
				model={{ type: 'occupation' }}
				name="Occupation Node"
				color={OCCUPATION_NODE_COLOR}
			/>
			<hr></hr>
			<h3 className="text-center">Modifiers</h3>
			<TrayItem model={{ type: 'not' }} name="NOT Node" color={MODIFIER_NODE_COLOR} />
			<TrayItem model={{ type: 'and' }} name="AND Node" color={MODIFIER_NODE_COLOR} />
			<TrayItem model={{ type: 'or' }} name="OR Node" color={MODIFIER_NODE_COLOR} />
			{/* <TrayItem model={{ type: 'orJoin' }} name="OR-JOIN Node" color={MODIFIER_NODE_COLOR} />
			<TrayItem model={{ type: 'notJoin' }} name="NOT-JOIN Node" color={MODIFIER_NODE_COLOR} /> */}
			<TrayItem model={{ type: 'inequality' }} name="Inequality" color={MODIFIER_NODE_COLOR} />
			<TrayItem model={{ type: 'count' }} name="Count Node" color={MODIFIER_NODE_COLOR} />
			<TrayItem
				model={{ type: 'socialConn' }}
				name="Social Connection"
				color={SOCIAL_CONN_NODE_COLOR}
			/>
		</div>
	);
};

export default NodeTray;
