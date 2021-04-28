import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NumberNodeModel } from './NumberNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { ERROR_BORDER_COLOR, NUMBER_NODE_COLOR, SELECTION_BORDER_COLOR } from '../../utility/constants';

const Node = styled.div<{ selected: boolean, hasError?: boolean }>`
  display: grid;
  box-sizing: content-box;
  grid-template-columns: 1fr auto;
  background-color: ${NUMBER_NODE_COLOR};
  border-radius: 5px;
  font-family: sans-serif;
  width: 10rem;
  font-size: 1rem;
  height: 2.25rem;
  padding: 3px 0 3px 3px;
  ${(p) => (p.hasError ? `border: solid 2px ${ERROR_BORDER_COLOR}` : '')}
  ${(p) => (p.selected && !p.hasError ? `border: solid 2px ${SELECTION_BORDER_COLOR}` : '')}
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
  /* color: black; */
  border: solid 2px black;
  border-radius: 10px 0px 0px 10px;
  background-color: #525252;
`;

export interface NumberNodeWidgetProps {
  node: NumberNodeModel;
  engine: DiagramEngine;
}

export interface NumberNodeWidgetState {
  value: string;
  hasError: boolean;
}

export class NumberNodeWidget extends React.Component<
  NumberNodeWidgetProps,
  NumberNodeWidgetState
> {
  constructor(props: NumberNodeWidgetProps) {
    super(props);
    this.state = {
      value: this.props.node.getOptions().value.toString(),
      hasError: false,
    };
  }

  public render(): React.ReactNode {
    const nodeOptions = this.props.node.getOptions();
    const outPort = this.props.node.outPort;

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(event.target.value);
      const hasError = isNaN(val);
      this.setState({
        ...this.state,
        value: event.target.value,
        hasError: hasError,
      });
      this.props.node.getOptions().value = val;
    };

    return (
      <Node
        data-person-node-name={nodeOptions.label}
        selected={this.props.node.isSelected()}
        hasError={this.state.hasError}
      >
        <div style={{paddingRight: '3px', overflow: 'hidden'}}>
          <VariableValue
          type='text'
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
