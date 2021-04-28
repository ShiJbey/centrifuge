import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { ModifierNodeModel } from './ModifierNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { MODIFIER_NODE_COLOR, SELECTION_BORDER_COLOR } from '../../utility/constants';

const Node = styled.div<{ selected: boolean }>`
  display: grid;
  box-sizing: content-box;
  grid-template-rows: auto 1fr;
  background-color: ${MODIFIER_NODE_COLOR};
  border-radius: 5px;
  font-family: sans-serif;
  font-size: 11px;
  padding: 3px 0 3px 3px;
  min-width: 20em;
  ${(p) => (p.selected ? `border: solid 2px ${SELECTION_BORDER_COLOR}` : '')}
`;

const Title = styled.div`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  white-space: nowrap;
  justify-items: center;
`;

const TitleName = styled.div`
  flex-grow: 1;
  padding: 5px 5px;
`;

const Select = styled.select`
  color: black;
  border-radius: 5px;
  font-weight: bold;
  background: #ccc;
  overflow: hidden;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
`;

const NodeBody = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

const InputPortContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: #525252;
`;

const OutPortContainer = styled.div`
  background-color: #525252;
`;

export interface ModifierNodeWidgetProps {
  node: ModifierNodeModel;
  engine: DiagramEngine;
}

export interface ModifierNodeWidgetState {
  name: string;
}

export class ModifierNodeWidget extends React.Component<
  ModifierNodeWidgetProps,
  ModifierNodeWidgetState
> {
  constructor(props: ModifierNodeWidgetProps) {
    super(props);
    this.state = {
      name: this.props.node.getOptions().name,
    };
  }

  public render(): React.ReactNode {
    const onNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      this.setState({
        ...this.state,
        name: event.target.value,
      });
      this.props.node.getOptions().name = event.target.value;
    };

    return (
      <Node
        data-person-node-name={this.props.node.getOptions().label}
        selected={this.props.node.isSelected()}
      >
        <Title>
          <TitleName>{this.props.node.getOptions().label}</TitleName>
        </Title>
        <NodeBody>
          <InputPortContainer>
            <DefaultPortLabel
              engine={this.props.engine}
              port={this.props.node.valueAPort}
              key={this.props.node.valueAPort.getID()}
            />

            <Select
              name="cars"
              id="cars"
              onClick={(event) => {
                event.currentTarget.contentEditable = 'true';
              }}
              onChange={onNameChange}
              onDrag={(e) => e.preventDefault()}
              onFocus={() => {
                this.props.node.setLocked(true);
              }}
              onBlur={(event) => {
                event.currentTarget.contentEditable = 'false';
                this.props.node.setLocked(false);
              }}
            >
              <option value=">">Greater Than</option>
              <option value="<">Less Than</option>
              <option value=">=">Greater Than/ Equal To</option>
              <option value="<=">Less Than / Equal to</option>
            </Select>
            <DefaultPortLabel
              engine={this.props.engine}
              port={this.props.node.valueBPort}
              key={this.props.node.valueBPort.getID()}
            />
          </InputPortContainer>

          <OutPortContainer>
            <DefaultPortLabel
              engine={this.props.engine}
              port={this.props.node.outPort}
              key={this.props.node.outPort.getID()}
            />
          </OutPortContainer>
        </NodeBody>
      </Node>
    );
  }
}
