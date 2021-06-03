import * as React from 'react';
import styled from 'styled-components';

interface AppCanvasWidgetProps {
  color?: string;
  background?: string;
}

const Container = styled.div<{ color: string; background: string }>`
  height: 100%;
  background-color: ${(p) => p.background};
  background-size: 50px 50px;
  display: flex;

  > * {
    height: 100%;
    min-height: 100%;
    width: 100%;
  }

  /* background-image: linear-gradient(
      0deg,
      transparent 24%,
      ${(p) => p.color} 25%,
      ${(p) => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${(p) => p.color} 75%,
      ${(p) => p.color} 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      ${(p) => p.color} 25%,
      ${(p) => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${(p) => p.color} 75%,
      ${(p) => p.color} 76%,
      transparent 77%,
      transparent
    ); */
`;

const AppCanvasWidget: React.FC<AppCanvasWidgetProps> = (props) => {
  return (
    <>
      <Container
        background={props.background || 'rgb(60, 60, 60)'}
        color={props.color || 'rgba(255,255,255, 0.05)'}
      >
        {props.children}
      </Container>
    </>
  );
};

export default AppCanvasWidget;
