import { DirectoryTree } from 'directory-tree';
import React, { Component, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { FaChevronRight } from 'react-icons/fa';
import ElectronAPI, { OpenFileResponse } from '../../utility/electronApi';
import { RootState } from '../../redux/store';
import styles from './FileExplorer.module.scss';
import { OPEN_DIR, OPEN_PATTERN_FILE } from '../../utility/electronChannels';
import classNames from 'classnames';
import { addEditor, UpdateEditorChanges } from '../../redux/editorSlice';
import { Dispatch } from '@reduxjs/toolkit';
import SavedPatternData from 'src/utility/models/savedPatternData';

declare const electron: ElectronAPI;

interface TreeNodeProps {
    node: DirectoryTree;
    depth: number;
    onOpenFile: (filepath: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, depth, onOpenFile }) => {
    const [collapsed, setCollapsed] = useState(false);
    const hasChildren = node?.children?.length ? true : false;
    const isDirectory = node.type === 'directory';

    return (
        <li className={styles.DTreeNode}>
            <div
                className={classNames(styles.NodeName, {
                    [styles.RootDir]: depth === 0,
                })}
                style={{ paddingLeft: `${10 * depth}px` }}
                onClick={() => {
                    if (isDirectory) {
                        setCollapsed(!collapsed);
                    }
                }}
                onDoubleClick={() => {
                    if (node.extension === '.json') {
                        onOpenFile(node.path);
                    }
                }}
            >
                {isDirectory && (
                    <div
                        className={classNames(
                            'd-inline',
                            'mx-1',
                            styles.DTreeToggler,
                            {
                                [styles.active]: !collapsed,
                            }
                        )}
                    >
                        <FaChevronRight />
                    </div>
                )}
                {node.name}
            </div>

            {isDirectory && !collapsed && hasChildren && (
                <ul className={styles.DTreeContainer}>
                    {node.children &&
                        node.children.map((child, index) => {
                            return (
                                <TreeNode
                                    key={node.name + '_child_' + index}
                                    node={child}
                                    depth={depth + 1}
                                    onOpenFile={(filepath) =>
                                        onOpenFile(filepath)
                                    }
                                />
                            );
                        })}
                </ul>
            )}
        </li>
    );
};

interface FileExplorerProps extends PropsFromRedux {
    onOpenFile?: (path: string) => void;
}

class FileExplorer extends Component<FileExplorerProps> {
    openDirectory() {
        electron.send(OPEN_DIR);
    }

    openFile = async (path: string) => {
        const res: OpenFileResponse<SavedPatternData> = await electron.invoke(
            OPEN_PATTERN_FILE,
            path
        );
        if (res.status === 'ok') {
            if (res.payload) {
                this.props.addEditor({
                    patternName: res.payload.data.name,
                    filepath: res.payload.path,
                    model: res.payload.data.diagram,
                });
            }
        } else {
            console.error(res.payload);
        }
    };

    render() {
        return (
            <div className={styles.FileExplorer}>
                <div
                    style={{
                        fontSize: 'small',
                        background: '#0000001f',
                        textAlign: 'center',
                    }}
                >
                    WORKSPACE FOLDER
                </div>
                {this.props.directoryTree ? (
                    <ul className={styles.DTreeContainer}>
                        <TreeNode
                            node={this.props.directoryTree}
                            depth={0}
                            onOpenFile={(filepath: string) =>
                                this.openFile(filepath)
                            }
                        />
                    </ul>
                ) : (
                    <div
                        style={{
                            padding: '16px',
                            display: 'flex',
                            placeContent: 'center',
                            placeItems: 'center',
                        }}
                    >
                        <Button
                            variant="primary"
                            onClick={() => this.openDirectory()}
                        >
                            Open Folder
                        </Button>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    directoryTree: state.fileTree.directoryTree,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addEditor: (options: UpdateEditorChanges) => dispatch(addEditor(options)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FileExplorer);
