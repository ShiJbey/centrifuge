import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { StringNodeModel } from './StringNodeModel';
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
  color: white;
  border: solid 2px black;
  border-radius: 10px 0px 0px 10px;
  background-color: #525252;
`;

export interface StringNodeWidgetProps {
  node: StringNodeModel;
  engine: DiagramEngine;
}

export interface StringNodeWidgetState {
  value: string;
}

export class StringNodeWidget extends React.Component<
  StringNodeWidgetProps,
  StringNodeWidgetState
> {
  constructor(props: StringNodeWidgetProps) {
    super(props);
    this.state = {
      value: this.props.node.getOptions().value,
    };
  }

  public render(): React.ReactNode {
    const nodeOptions = this.props.node.getOptions();
    const outPort = this.props.node.outPort;

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        ...this.state,
        value: event.target.value,
      });
      this.props.node.getOptions().value = event.target.value;
    };

    return (
      <Node
        data-person-node-name={nodeOptions.label}
        selected={this.props.node.isSelected()}
      >
        <div style={{paddingRight: '3px', overflow: 'hidden'}}>
          <VariableValue
            type="text"
            value={this.state.value}
            onClick={(event) => {
              event.currentTarget.contentEditable = 'true';
            }}
            onChange={onValueChange}
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
