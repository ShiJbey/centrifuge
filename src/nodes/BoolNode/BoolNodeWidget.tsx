import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { BoolNodeModel } from './BoolNodeModel';
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

const Select = styled.select`
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
  /* color: black; */
  border: solid 2px black;
  border-radius: 10px 0px 0px 10px;
  background-color: #525252;
`;

export interface BoolNodeWidgetProps {
  node: BoolNodeModel;
  engine: DiagramEngine;
}

export interface BoolNodeWidgetState {
  value: boolean;
}

export class BoolNodeWidget extends React.Component<
  BoolNodeWidgetProps,
  BoolNodeWidgetState
> {
  constructor(props: BoolNodeWidgetProps) {
    super(props);
    this.state = {
      value: this.props.node.getOptions().value,
    };
  }

  public render(): React.ReactNode {
    const nodeOptions = this.props.node.getOptions();
    const outPort = this.props.node.outPort;

    const onValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const val = event.target.value === 'true' ? true : false;
      this.setState({
        ...this.state,
        value: val,
      });
      this.props.node.getOptions().value = val;
    };

    return (
      <Node
        data-person-node-name={nodeOptions.label}
        selected={this.props.node.isSelected()}
      >
        <div style={{ paddingRight: '3px', overflow: 'hidden' }}>
          {/* <VariableValue
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
            {this.state.name}
          </VariableValue> */}
          <Select
            name="cars"
            id="cars"
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
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </Select>
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
