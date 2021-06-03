import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { VariableNodeModel } from './VariableNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
  VARIABLE_NODE_COLOR,
  SELECTION_BORDER_COLOR,
} from '../../utility/constants';

const Node = styled.div<{ selected: boolean }>`
  box-sizing: content-box;
  background-color: ${VARIABLE_NODE_COLOR};
  border-radius: 5px;
  font-family: sans-serif;
  width: 12rem;
  font-size: 1rem;
  ${(p) => (p.selected ? `border: solid 2px ${SELECTION_BORDER_COLOR}` : '')}
`;

const Header = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  background: hsla(0, 0%, 0%, 0.5);
  padding: 0.1rem;
  color: white;
`;

const Ports = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
`;

const VariableValue = styled.input`
  color: black;
  border-radius: 5px;
  font-weight: bold;
  background: #ccc;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const PortContainer = styled.div`
  background-color: #00000039;
  color: white;
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
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        ...this.state,
        name: event.target.value,
      });
      this.props.node.getOptions().name = event.target.value;
    };

    return (
      <Node selected={this.props.node.isSelected()}>
        <Header>Variable</Header>
        <div style={{ width: '100%', display: 'flex' }}>
          <label style={{paddingLeft: '0.1rem', paddingRight: '0.1rem'}}>Name:</label>
          <VariableValue
            type="text"
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
        <Ports>
          <div>
            <PortContainer>
              <DefaultPortLabel
                engine={this.props.engine}
                port={this.props.node.inPort}
                key={this.props.node.inPort.getID()}
              />
            </PortContainer>
          </div>
          <div>
            <PortContainer>
              <DefaultPortLabel
                engine={this.props.engine}
                port={this.props.node.outPort}
                key={this.props.node.outPort.getID()}
              />
            </PortContainer>
          </div>
        </Ports>
        <div>
          Public: <input type="checkbox" />
        </div>
      </Node>
    );
  }
}
