import React from 'react';
import styled from 'styled-components';

const Tray = styled.div`
  min-width: 200px;
`;

const TrayWidget: React.FC = (props) => {
  return <Tray>{props.children}</Tray>;
};

export default TrayWidget;
