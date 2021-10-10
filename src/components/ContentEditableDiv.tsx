import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.2rem;
`;

interface Props {
    value: string;
    className?: string;
    onActive?: () => void;
    onFocus?: () => void;
    onChange?: (text: string) => void;
}

interface State {
    isEditable: boolean;
}

const ContentEditableDiv: React.FC<Props> = (props) => {
    const [state, setState] = useState<State>({ isEditable: false });
    return (
        <Container
            className={props.className}
            contentEditable={state.isEditable}
            suppressContentEditableWarning={true}
            onFocus={() => {
                if (props.onFocus) props.onFocus();
            }}
            onBlur={(event) => {
                setState({
                    ...state,
                    isEditable: false,
                });
                if (props.onChange) props.onChange(event.target.innerText);
            }}
            onDoubleClick={() => {
                setState({
                    ...state,
                    isEditable: true,
                });
                if (props.onActive) props.onActive();
            }}
        >
            {props.value}
        </Container>
    );
};

export default ContentEditableDiv;
