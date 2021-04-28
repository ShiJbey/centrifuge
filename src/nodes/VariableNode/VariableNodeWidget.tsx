import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { VariableNodeModel } from './VariableNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { VARIABLE_NODE_COLOR, SELECTION_BORDER_COLOR } from '../../utility/constants';

const Node = styled.div<{ selected: boolean }>`
  display: grid;
  box-sizing: content-box;
  grid-template-columns: 1fr auto;
  background-color: ${VARIABLE_NODE_COLOR};
  border-radius: 5px;
  font-family: sans-serif;
  width: 10rem;
  font-size: 1rem;
  height: 2.25rem;
  padding: 3px 0 3px 3px;
  ${(p) => (p.selected ? `border: solid 2px ${SELECTION_BORDER_COLOR}` : '')}
`;

const VariableValue = styled.input`
  color: black;
  border-radius: 5px;
  font-weight: bold;
  background: #ccc;
  overflow: hidden;
  display: flex;
  justify-content: left;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const PortContainer = styled.div`
  border: solid 2px black;
  border-radius: 10px 0px 0px 10px;
  background-color: #525252;
`;

export interface VariableNodeWidgetProps {
  node: VariableNodeModel;
  engine: DiagramEngine;
}

export interface VariableNodeWidgetState {
  name: string;
}

export class VariableNodeWidget extends React.Component<
  VariableNodeWidgetProps,
  VariableNodeWidgetState
> {
  constructor(props: VariableNodeWidgetProps) {
    super(props);
    this.state = {
      name: this.props.node.getOptions().name,
    };
  }

  public render(): React.ReactNode {
    const nodeOptions = this.props.node.getOptions();
    const outPort = this.props.node.outPort;

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        ...this.state,
        name: event.target.value,
      });
      this.props.node.getOptions().name = event.target.value;
    };

    return (
      <Node
        data-person-node-name={nodeOptions.label}
        selected={this.props.node.isSelected()}
      >
        <div style={{paddingRight: '3px', overflow: 'hidden'}}>
          <VariableValue
            type='text'
            value={this.state.name}
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
          />
        </div>
        <PortContainer>
          <DefaultPortLabel
            engine={this.props.engine}
            port={outPort}
            key={outPort.getID()}
          />
        </PortContainer>
      </Node>
    );
  }
}
