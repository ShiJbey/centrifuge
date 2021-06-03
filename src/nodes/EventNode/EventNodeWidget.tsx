import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { EventNodeModel } from './EventNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
  EVENT_NODE_COLOR,
  SELECTION_BORDER_COLOR,
} from '../../utility/constants';

const Node = styled.div<{ background: string; selected: boolean }>`
  background-color: ${(p) => p.background ?? EVENT_NODE_COLOR};
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

export interface EventNodeWidgetProps {
  node: EventNodeModel;
  engine: DiagramEngine;
}

export class EventNodeWidget extends React.Component<EventNodeWidgetProps> {
  constructor(props: EventNodeWidgetProps) {
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
          <label htmlFor={`eventTypes_${this.props.node.getID()}`}></label>
          <select
            defaultValue={nodeOptions.eventType}
            style={{width: '100%'}}
            name={`eventTypes_${this.props.node.getID()}`}
            onChange={(event) => {
              this.props.node.getOptions().eventType = event.target.value;
              this.props.node.changePorts(event.target.value);
              this.forceUpdate();
            }}
          >
            <option value="_">Select event type...</option>
            <option value="Adoption">Adoption</option>
            <option value="Birth">Birth</option>
            <option value="BusinessConstruction">Business Contruction</option>
            <option value="BusinessClosure">BusinessClosure</option>
            <option value="Death">Death</option>
            <option value="Demolition">Demolition</option>
            <option value="Departure">Departure</option>
            <option value="Divorce">Divorce</option>
            <option value="Hiring">Hiring</option>
            <option value="HomePurchase">Home Purchase</option>
            <option value="HouseConstruction">House Construction</option>
            <option value="LayOff">LayOff</option>
            <option value="Marriage">Marriage</option>
            <option value="Move">Move</option>
            <option value="NameChange">NameChange</option>
            <option value="Retirement">Retirement</option>
          </select>
        </div>
        <Ports>
          <PortsContainer>
            <DefaultPortLabel
              engine={this.props.engine}
              port={this.props.node.timestampPort}
              key={this.props.node.timestampPort.getID()}
            />
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
