import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { NotJoinNodeModel } from './NotJoinNodeModel';
import {
  NOT_JOIN_NODE_COLOR,
  SELECTION_BORDER_COLOR,
} from '../../utility/constants';

const Node = styled.div<{ selected: boolean }>`
  background-color: ${NOT_JOIN_NODE_COLOR};
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

export interface NotJoinNodeWidgetProps {
  node: NotJoinNodeModel;
  engine: DiagramEngine;
}

export class NotJoinNodeWidget extends React.Component<NotJoinNodeWidgetProps> {
  constructor(props: NotJoinNodeWidgetProps) {
    super(props);
  }

  public render(): React.ReactNode {
    const nodeOptions = this.props.node.getOptions();

    return (
      <Node
        selected={this.props.node.isSelected()}
      >
        <Title>
          <TitleName>{nodeOptions.label}</TitleName>
        </Title>
        <div>
          <button
            onClick={() => {
              this.props.node.addPortSet();
              this.forceUpdate();
            }}
          >
            + Add Variable
          </button>
          <button
            onClick={() => {
              this.props.node.removePortSet();
              this.forceUpdate();
            }}
          >
            - Remove Variable
          </button>
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
          {this.props.node.getOutPorts().map((port) => (
              <DefaultPortLabel
                engine={this.props.engine}
                port={port}
                key={port.getID()}
              />
            ))}
          </PortsContainer>
        </Ports>
      </Node>
    );
  }
}
