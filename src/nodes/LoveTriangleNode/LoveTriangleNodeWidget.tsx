import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {
  LoveTriangleNodeModel,
} from './LoveTriangleNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
  LOVE_TRIANGLE_NODE_COLOR,
  SELECTION_BORDER_COLOR,
} from '../../constants';

const Node = styled.div<{ background: string; selected: boolean }>`
  background-color: ${(p) => p.background ?? LOVE_TRIANGLE_NODE_COLOR};
  border-radius: 5px;
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
  display: flex;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
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

export interface LoveTriangleNodeWidgetProps {
  node: LoveTriangleNodeModel;
  engine: DiagramEngine;
}

export class LoveTriangleNodeWidget extends React.Component<LoveTriangleNodeWidgetProps> {
  constructor(props: LoveTriangleNodeWidgetProps) {
    super(props);
  }

  public render(): React.ReactNode {
    const nodeOptions = this.props.node.getOptions();
    const person1Port = this.props.node.person1Port;
    const person2Port = this.props.node.person2Port;
    const person3Port = this.props.node.person3Port;


    return (
      <Node
        data-person-node-name={nodeOptions.label}
        selected={this.props.node.isSelected()}
        background={nodeOptions.color}
      >
        <Title>
          <TitleName>{nodeOptions.label}</TitleName>
        </Title>
        <Ports>
          <PortsContainer>
            <DefaultPortLabel
              engine={this.props.engine}
              port={person1Port}
              key={person1Port.getID()}
            />
          </PortsContainer>
        </Ports>
        <Ports>
          <PortsContainer>
            <DefaultPortLabel
              engine={this.props.engine}
              port={person2Port}
              key={person2Port.getID()}
            />
          </PortsContainer>
        </Ports>
        <Ports>
          <PortsContainer>
            <DefaultPortLabel
              engine={this.props.engine}
              port={person3Port}
              key={person3Port.getID()}
            />
          </PortsContainer>
        </Ports>
      </Node>
    );
  }
}
