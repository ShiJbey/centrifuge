import React from 'react';
import styled from 'styled-components';

interface TrayWidgetItemProps {
  model: { [key: string]: string };
  color?: string;
  name: string;
  enabled?: boolean;
}

const Container = styled.div<{ color: string }>`
  color: black;
  font-family: Helvetica, Arial;
  padding: 5px;
  margin: 0px 10px;
  border: solid 1px ${(p) => p.color};
  background: ${(p) => p.color};
  border-radius: 5px;
  margin-bottom: 2px;
  cursor: pointer;
`;

const TrayItem: React.FC<TrayWidgetItemProps> = (props) => {
  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData(
      'storm-diagram-node',
      JSON.stringify(props.model)
    );
  };

  return (
    <Container
      color={props.color}
      draggable={props?.enabled ?? true}
      onDragStart={onDragStart}
      className="tray-item"
    >
      {props.name}
    </Container>
  );
};

export default TrayItem;
