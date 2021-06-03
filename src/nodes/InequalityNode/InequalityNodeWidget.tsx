import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { InequalityNodeModel } from './InequalityNodeModel';
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

export interface InequalityNodeWidgetProps {
  node: InequalityNodeModel;
  engine: DiagramEngine;
}

export interface InequalityNodeWidgetState {
  name: string;
}

export class InequalityNodeWidget extends React.Component<
  InequalityNodeWidgetProps,
  InequalityNodeWidgetState
> {
  constructor(props: InequalityNodeWidgetProps) {
    super(props);
  }

  public render(): React.ReactNode {
    const onSignChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      this.setState({
        ...this.state,
        name: event.target.value,
      });
      this.props.node.getOptions().sign = event.target.value;
    };

    return (
      <Node selected={this.props.node.isSelected()}>
        <Title>
          <TitleName>{this.props.node.getOptions().label}</TitleName>
        </Title>
        <Ports>
          <PortsContainer>
            <DefaultPortLabel
              engine={this.props.engine}
              port={this.props.node.valueAPort}
              key={this.props.node.valueAPort.getID()}
            />
            <div>
              <select
                onChange={onSignChange}
                style={{width: '100%', fontWeight: 'bold', fontSize: '1.1rem'}}
                defaultValue={this.props.node.getOptions().sign}
              >
                <option value="=">=</option>
                <option value="!=">!=</option>
                <option value=">">&#62;</option>
                <option value="<">&#60;</option>
                <option value=">=">&ge;</option>
                <option value="<=">&le;</option>
              </select>
            </div>
            <DefaultPortLabel
              engine={this.props.engine}
              port={this.props.node.valueBPort}
              key={this.props.node.valueBPort.getID()}
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
