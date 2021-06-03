import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { OccupationNodeModel, OccupationTypes } from './OccupationNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
  OCCUPATION_NODE_COLOR,
  SELECTION_BORDER_COLOR,
} from '../../utility/constants';

const Node = styled.div<{ background: string; selected: boolean }>`
  background-color: ${(p) => p.background ?? OCCUPATION_NODE_COLOR};
  border-radius: 5px;
  width: max-content;
  font-family: sans-serif;
  color: white;
  overflow: visible;
  font-size: 11px;
  padding-bottom: 4px;
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

const Ports = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
`;

const PortsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(1, 1, 1, 0.6);

  &:first-of-type {
    margin-right: 10px;
  }

  &:only-child {
    margin-right: 0px;
  }
`;

export interface OccupationNodeWidgetProps {
  node: OccupationNodeModel;
  engine: DiagramEngine;
}

export class OccupationNodeWidget extends React.Component<OccupationNodeWidgetProps> {
  constructor(props: OccupationNodeWidgetProps) {
    super(props);
  }

  public render(): React.ReactNode {
    const nodeOptions = this.props.node.getOptions();

    return (
      <Node
        selected={this.props.node.isSelected()}
        background={nodeOptions.color}
      >
        <Title>
          <TitleName>{nodeOptions.label}</TitleName>
        </Title>
        <div>
          <label htmlFor={`occupationTypes_${this.props.node.getID()}`}></label>
          <select
            defaultValue={nodeOptions.occupationType}
            style={{ width: '100%' }}
            name={`occupationTypes_${this.props.node.getID()}`}
            onChange={(event) => {
              this.props.node.getOptions().occupationType = event.target.value;
              this.props.node.changePorts(event.target.value);
              this.forceUpdate();
            }}
          >
            <option value="_">Select Occupation type...</option>
            {OccupationTypes.map((typeName) => (
              <option
                key={`occupationTypes_${this.props.node.getID()}_${typeName}`}
                value={typeName}
              >
                {typeName}
              </option>
            ))}
          </select>
        </div>
        <Ports>
          <PortsContainer>
            {this.props.node.getInPorts().map((port) => (
              <DefaultPortLabel
                engine={this.props.engine}
                port={port}
                key={port.getID()}
              />
            ))}
          </PortsContainer>
          <PortsContainer>
            <DefaultPortLabel
              engine={this.props.engine}
              port={this.props.node.outPort}
              key={this.props.node.outPort.getID()}
            />
          </PortsContainer>
        </Ports>
      </Node>
    );
  }
}
