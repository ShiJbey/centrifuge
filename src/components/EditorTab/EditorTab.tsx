import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa';
import styles from './EditorTab.module.scss';

interface EditorTabProps {
    editorId: string;
    title: string;
    isDirty?: boolean;
    onClose: (editorId: string) => void;
}

const EditorTab: React.FC<EditorTabProps> = (props) => {
    const [showCloseBtn, setShowCloseBtn] = useState<boolean>(false);

    return (
        <div
            className={styles.EditorTab}
            onMouseEnter={() => setShowCloseBtn(true)}
            onMouseLeave={() => setShowCloseBtn(false)}
        >
            <div className={styles.Title}>
                {props.title}
                {!!props.isDirty && <span>*</span>}
            </div>
            <div>
                {showCloseBtn && (
                    <IconContext.Provider
                        value={{ className: styles.CloseBtn }}
                    >
                        <FaTimes
                            onClick={(event) => {
                                event.stopPropagation();
                                props.onClose(props.editorId);
                            }}
                        />
                    </IconContext.Provider>
                )}
            </div>
        </div>
    );
};

export default EditorTab;
