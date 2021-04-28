import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const NavTab = styled.div`
  width: 10rem;
  display: grid;
  grid-template-columns: 8rem 2rem;
`;

const TabTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface EditorTabTitleProps {
  title: string;
  isDirty?: boolean;
  onClose?: React.MouseEventHandler;
}

const EditorTabTitle: React.FC<EditorTabTitleProps> = ({
  title,
  isDirty,
  onClose,
}) => {
  const [dirty] = useState<boolean>(isDirty || false);
  const [showCloseBtn, setShowCloseBtn] = useState<boolean>(false);

  return (
    <NavTab
      onMouseEnter={() => setShowCloseBtn(true)}
      onMouseLeave={() => setShowCloseBtn(false)}
    >
      <TabTitle>
        {title}
        {dirty && <span>*</span>}
      </TabTitle>
      <div style={{ width: '100%', height: '100%' }}>
        {showCloseBtn && (
          <FaTimes onClick={onClose} style={{ color: 'black' }} />
        )}
      </div>
    </NavTab>
  );
};

export default EditorTabTitle;
