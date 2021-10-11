import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus, FaSave } from 'react-icons/fa';
import styles from './Toolbar.module.scss';

interface ToolBarProps {
    saveBtnActive: boolean;
    onNewBtnClick: () => void;
    onSaveBtnClick: () => void;
}

/** Button toolbar that appears above the tabs in the editor */
const Toolbar: React.FC<ToolBarProps> = (props) => {
    return (
        <div className={styles.Toolbar}>
            <Button
                variant="primary"
                onClick={() => props.onNewBtnClick()}
                className={`mx-1`}
            >
                <span>
                    {'New '}
                    <FaPlus />
                </span>
            </Button>

            <Button
                variant="primary"
                onClick={() => props.onSaveBtnClick()}
                className={`mx-1`}
                disabled={!props.saveBtnActive}
            >
                <span>
                    {'Save '}
                    <FaSave />
                </span>
            </Button>
        </div>
    );
};

export default Toolbar;
