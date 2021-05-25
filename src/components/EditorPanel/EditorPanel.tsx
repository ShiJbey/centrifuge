import React from 'react';
import styles from './EditorPanel.module.scss';


const EditorPanel: React.FC = ({ children }) => {
  return (
    <div className={styles.PanelContainer}>
      <div className={styles.Panel}>
        <div className={styles.PanelBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
