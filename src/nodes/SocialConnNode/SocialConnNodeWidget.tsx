import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { SocialConnNodeModel } from './SocialConnNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { Node, Header, Ports, PortContainer, SOCIAL_CONN_NODE_COLOR } from '../nodeStyles';

const ConnectionTypes: { name: string; label: string }[] = [
	{ name: 'spouse', label: 'Spouse of...' },
	{ name: 'significant_other', label: 'Significant Other of...' },
	{ name: 'love_interest', label: 'Love Interest of...' },
	{ name: 'worst_enemy', label: 'Worst Enemy of...' },
	{ name: 'best_friend', label: 'Best Friend of...' },
	{ name: 'former_coworkers', label: 'Former Coworkers of...' },
	{ name: 'coworkers', label: 'Coworkers of...' },
	{ name: 'former_neigbors', label: 'Former Neighbors of...' },
	{ name: 'neighbors', label: 'Neigbors of...' },
	{ name: 'enemies', label: 'Enemy(s) of...' },
	{ name: 'friends', label: 'Friend(s) of...' },
	{ name: 'acquaintances', label: 'Acquantance(s) of...' },
	{ name: 'sexual_partners', label: 'Sexual Partner(s) of...' },
	{ name: 'ancestors', label: 'Ancestor(s) of...' },
	{ name: 'descendants', label: 'Descendant(s) of...' },
	{ name: 'immediate_family', label: 'Immediate Family of...' },
	{ name: 'extended_family', label: 'Extended Family of...' },
	{ name: 'greatgrandparents', label: 'Great Grandparent(s) of...' },
	{ name: 'grandparents', label: 'GrandParent(s) of...' },
	{ name: 'aunts', label: 'Aunt(s) of...' },
	{ name: 'uncles', label: 'Uncle(s) of...' },
	{ name: 'siblings', label: 'Sibling(s) of...' },
	{ name: 'full_siblings', label: 'Full Sibling(s) of...' },
	{ name: 'half_siblings', label: 'Half Sibling(s) of...' },
	{ name: 'brothers', label: 'Brother(s) of...' },
	{ name: 'full_brothers', label: 'Full Brother(s) of...' },
	{ name: 'half_brothers', label: 'Half Brother(s) of...' },
	{ name: 'sisters', label: 'Sister(s) of...' },
	{ name: 'half_sisters', label: 'Half Sister(s) of...' },
	{ name: 'full_sisters', label: 'Full Sister(s) of...' },
	{ name: 'cousins', label: 'Cousin(s) of...' },
	{ name: 'kids', label: 'Kids(s) of...' },
	{ name: 'sons', label: 'Son(s) of...' },
	{ name: 'daughters', label: 'Daughter(s) of...' },
	{ name: 'nephews', label: 'Nephew(s) of...' },
	{ name: 'nieces', label: 'Niece(s) of...' },
	{ name: 'grandchildren', label: 'GrandChild(s) of...' },
	{ name: 'grandsons', label: 'GrandSon(s) of...' },
	{ name: 'granddaughters', label: 'GrandDaughter(s) of...' },
	{ name: 'bio_parents', label: 'Biological Parent(s) of...' },
	{ name: 'bio_grandparents', label: 'Biological GrandParent(s) of...' },
	{ name: 'bio_siblings', label: 'Biological Sibling(s) of...' },
	{ name: 'bio_full_siblings', label: 'Biological Full-Siling(s) of...' },
	{ name: 'bio_half_siblings', label: 'Biological Half-Sibling(s) of...' },
	{ name: 'bio_brothers', label: 'Biological Brother(s) of...' },
	{ name: 'bio_half_brothers', label: 'Biological Half-Brother(s) of...' },
	{ name: 'bio_full_brothers', label: 'Biological Full-Brother(s) of...' },
	{ name: 'bio_sisters', label: 'Biological Sister(s) of...' },
	{ name: 'bio_half_sisters', label: 'Biological Half-Sister(s) of...' },
	{ name: 'bio_full_sisters', label: 'Biological Full-Sister(s) of...' },
	{ name: 'bio_immediate_family', label: 'Biological Immediate Family of...' },
	{ name: 'bio_greatgrandparents', label: 'Biological GreatGrandparent(s) of...' },
	{ name: 'bio_uncles', label: 'Biological Uncle(s) of...' },
	{ name: 'bio_aunts', label: 'Biological Aunt(s) of...' },
	{ name: 'bio_cousins', label: 'Biological Cousin(s) of...' },
	{ name: 'bio_nephews', label: 'Biological Nephew(s) of...' },
	{ name: 'bio_nieces', label: 'Biological Niece(s) of...' },
	{ name: 'bio_ancestors', label: 'Biological Ancestor(s) of...' },
	{ name: 'bio_extended_family', label: 'Biological Extended Family of...' },
];

export interface SocialConnNodeWidgetProps {
	node: SocialConnNodeModel;
	engine: DiagramEngine;
}

export interface SocialConnNodeWidgetState {
	name: string;
}

export class SocialConnNodeWidget extends React.Component<
	SocialConnNodeWidgetProps,
	SocialConnNodeWidgetState
> {
	constructor(props: SocialConnNodeWidgetProps) {
		super(props);
	}

	public render(): React.ReactNode {
		const onTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
			this.setState({
				...this.state,
				name: event.target.value,
			});
			this.props.node.getOptions().relationshipType = event.target.value;
		};

		return (
			<Node background={SOCIAL_CONN_NODE_COLOR} selected={this.props.node.isSelected()}>
				<Header>
					<PortContainer>
						<DefaultPortLabel
							engine={this.props.engine}
							port={this.props.node.outPort}
							key={this.props.node.outPort.getID()}
						/>
					</PortContainer>
				</Header>
				<PortContainer>
					<DefaultPortLabel
						engine={this.props.engine}
						port={this.props.node.valueAPort}
						key={this.props.node.valueAPort.getID()}
					/>
					<div>
						<select
							onChange={onTypeChange}
							style={{
								width: '100%',
								fontWeight: 'bold',
								fontSize: '1.1rem',
							}}
							defaultValue={this.props.node.getOptions().relationshipType}
						>
							{ConnectionTypes.map((connType) => (
								<option
									key={`connType_${this.props.node.getID()}_${connType.name}`}
									value={connType.name}
								>
									{connType.label}
								</option>
							))}
						</select>
					</div>
					<DefaultPortLabel
						engine={this.props.engine}
						port={this.props.node.valueBPort}
						key={this.props.node.valueBPort.getID()}
					/>
				</PortContainer>
			</Node>
		);
	}
}
