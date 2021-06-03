import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NotNodeModel } from './NotNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
  MODIFIER_NODE_COLOR,
  SELECTION_BORDER_COLOR,
} from '../../utility/constants';

const Node = styled.div<{ selected: boolean }>`
  background-color: ${MODIFIER_NODE_COLOR};
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

// const Select = styled.select`
//   color: black;
//   border-radius: 5px;
//   font-weight: bold;
//   background: #ccc;
//   overflow: hidden;
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   width: 100%;
// `;

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

export interface NotNodeWidgetProps {
  node: NotNodeModel;
  engine: DiagramEngine;
}

export interface NotNodeWidgetState {
  name: string;
}

export class NotNodeWidget extends React.Component<
  NotNodeWidgetProps,
  NotNodeWidgetState
> {
  constructor(props: NotNodeWidgetProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <Node selected={this.props.node.isSelected()}>
        <Title>
          <TitleName>{this.props.node.getOptions().label}</TitleName>
        </Title>
        <Ports>
          <PortsContainer>
            <DefaultPortLabel
              engine={this.props.engine}
              port={this.props.node.valuePort}
              key={this.props.node.valuePort.getID()}
            />
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
