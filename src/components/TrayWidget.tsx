import React from 'react';
import styled from 'styled-components';

const Tray = styled.div`
  min-width: 200px;
  background: rgb(20, 20, 20);
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  overflow-y: scroll;
`;

const TrayWidget: React.FC = (props) => {
  return (
    <Tray>{props.children}</Tray>
  );
}

export default TrayWidget;
