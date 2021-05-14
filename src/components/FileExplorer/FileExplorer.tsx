import React from 'react';
import styles from './FileExplorer.module.scss';

const FileExplorer = () => {
  return (
    <div className={styles.FileExplorer}>
      <div className={styles.DirectoryName}>Directory</div>
      <div className={styles.FileListContainer}>
        <ul>
          <li>diagram_1.ctr</li>
          <li>diagram_2.ctr</li>
        </ul>
      </div>
    </div>
  );
};

export default FileExplorer;
