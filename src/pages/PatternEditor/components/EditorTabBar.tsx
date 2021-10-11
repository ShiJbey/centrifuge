import classNames from 'classnames';
import React from 'react';
import { Nav } from 'react-bootstrap';
import EditorTab from '../../../components/EditorTab';
import styles from './EditorTabBar.module.scss';

interface TabInfo {
    editorId: string;
    isDirty: boolean;
    title: string;
    isActive: boolean;
}

interface EditorTabBarProps {
    activeTab?: string;
    tabs: TabInfo[];
    onTabClose: (editorId: string) => void;
    onTabSelect: (editorId: string) => void;
}

const EditorTabBar: React.FC<EditorTabBarProps> = (props) => {
    return (
        <Nav
            as="div"
            style={{ flexWrap: 'nowrap', padding: '0px 8px 0px 8px' }}
            className={styles.EditorTabNav}
            activeKey={props.activeTab}
            onSelect={(editorId) => {
                if (editorId) props.onTabSelect(editorId);
            }}
        >
            {props.tabs.map((tab) => {
                return (
                    <Nav.Item
                        key={tab.editorId}
                        className={classNames(styles.EditorTab, {
                            [styles.ActiveTab]: tab.isActive,
                        })}
                    >
                        <Nav.Link eventKey={tab.editorId}>
                            <EditorTab
                                editorId={tab.editorId}
                                isDirty={tab.isDirty}
                                title={tab.title}
                                onClose={(editorId) =>
                                    props.onTabClose(editorId)
                                }
                            />
                        </Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
    );
};

export default EditorTabBar;
