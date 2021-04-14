import React from 'react';
import styled from 'styled-components';

interface TrayWidgetItemProps {
  model: {[key:string]: string};
  color?: string;
  name: string;
  enabled?: boolean;
}

const Tray = styled.div<{ color: string }>`
  color: white;
  font-family: Helvetica, Arial;
  padding: 5px;
  margin: 0px 10px;
  border: solid 1px ${(p) => p.color};
  border-radius: 5px;
  margin-bottom: 2px;
  cursor: pointer;
`;

const TrayWidgetItem: React.FC<TrayWidgetItemProps> = (props) => {
  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData(
      'storm-diagram-node',
      JSON.stringify(props.model)
    );
  };

  return (
    <Tray
      color={props.color}
      draggable={props?.enabled ?? true}
      onDragStart={onDragStart}
      className='tray-item'
    >
      {props.name}
    </Tray>
  );
};

export default TrayWidgetItem;
