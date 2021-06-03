import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { PersonNodeModel } from './PersonNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { PERSON_NODE_COLOR, SELECTION_BORDER_COLOR } from '../../utility/constants';

const Node = styled.div<{ background: string; selected: boolean }>`
  display: grid;
  width: max-content;
  grid-template-rows: auto 1fr;
  box-sizing: content-box;
  background-color: ${PERSON_NODE_COLOR};
  border-radius: 5px;
  font-family: sans-serif;
  color: white;
  overflow: visible;
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
  background-color: rgba(1, 1, 1, 0.6);
`;

export interface PersonNodeWidgetProps {
  node: PersonNodeModel;
  engine: DiagramEngine;
}

export class PersonNodeWidget extends React.Component<PersonNodeWidgetProps> {
  constructor(props: PersonNodeWidgetProps) {
    super(props);
  }

  public render(): React.ReactNode {
    // const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   this.setState({
    //     ...this.state,
    //     label: event.target.value,
    //   });
    //   this.props.node.getOptions().label = event.target.value;
    // };

    const nodeOptions = this.props.node.getOptions();

    return (
      <Node
        data-person-node-name={nodeOptions.label}
        selected={this.props.node.isSelected()}
        background={nodeOptions.color}
      >
        <Title>
          <TitleName>
            {nodeOptions.label}
          </TitleName>
        </Title>
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
