import styled from 'styled-components';

export const SELECTION_BORDER_COLOR = 'rgb(0, 192, 255)';
export const ERROR_BORDER_COLOR = 'rgb(255, 0, 0)';
export const PERSON_NODE_COLOR = '#FFAC81';
export const EVENT_NODE_COLOR = '#FF928B';
export const OCCUPATION_NODE_COLOR = '#FEC3A6';
export const BUSINESS_NODE_COLOR = '#EFE9AE';
export const SOCIAL_CONN_NODE_COLOR = 'rgb(255, 204, 153)';
export const RELATIONSHIP_NODE_COLOR = '#CDEAC0';
export const VARIABLE_NODE_COLOR = '#ccc';
export const PRIMITIVE_NODE_COLOR = '#ccc';
export const MODIFIER_NODE_COLOR = 'steelblue';
export const NODE_BORDER_RADIUS = '5px';
export const NODE_FONT_FAMILY = 'sans-serif';
export const NODE_FONT_SIZE = '0.65rem';

export const Node = styled.div<{
    background?: string;
    selected?: boolean;
    hasError?: boolean;
    hasWarning?: boolean;
}>`
    box-sizing: content-box;
    background-color: ${(p) => (p.background ? p.background : 'white')};
    width: max-content;
    border-radius: ${NODE_BORDER_RADIUS};
    font-family: ${NODE_FONT_FAMILY};
    font-size: ${NODE_FONT_SIZE};
    padding-bottom: 0.2rem;
    overflow: hidden;
    ${(p) => {
        if (p.selected) {
            return `border: solid 2px ${SELECTION_BORDER_COLOR}`;
        } else if (p.hasWarning) {
            return `border: solid 2px yellow`;
        } else if (p.hasError) {
            return `border: solid 2px ${ERROR_BORDER_COLOR}`;
        } else {
            return '';
        }
    }}
`;

export const Header = styled.div`
    font-weight: bold;
    background: hsla(0, 0%, 0%, 0.5);
    padding: 0.1rem;
    color: white;
    text-align: center;
`;

export const Ports = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto;
`;

export const PortContainer = styled.div`
    background-color: #00000039;
    color: white;
`;

export const PortGroupLabel = styled.div`
    text-align: center;
    width: 100%;
    font-weight: bold;
    color: white;
`;

export const PrimitiveOutputPortContainer = styled.div`
    color: white;
    border: solid 2px black;
    border-radius: 10px 0px 0px 10px;
    background-color: #525252;
`;

export const NodeValueInput = styled.input`
    color: black;
    border-radius: 5px;
    font-weight: bold;
    background: #ccc;
    overflow: hidden;
    display: flex;
    justify-content: left;
    align-items: center;
    height: 100%;
    width: 100%;
`;
