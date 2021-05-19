import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa';
import styles from './EditorTab.module.scss';

interface EditorTabTitleProps {
  title: string;
  isDirty?: boolean;
  onClose?: React.MouseEventHandler;
}

const EditorTab: React.FC<EditorTabTitleProps> = ({
  title,
  isDirty,
  onClose,
}) => {
  const [showCloseBtn, setShowCloseBtn] = useState<boolean>(false);

  return (
    <div
      className={styles.EditorTab}
      onMouseEnter={() => setShowCloseBtn(true)}
      onMouseLeave={() => setShowCloseBtn(false)}
    >
      <div className={styles.Title}>
        {title}
        {isDirty && <span>*</span>}
      </div>
      <div>
        {showCloseBtn && (
          <IconContext.Provider value={{className:styles.CloseBtn}}>
            <FaTimes onClick={onClose} />
          </IconContext.Provider>
        )}
      </div>
    </div>
  );
};

export default EditorTab;
