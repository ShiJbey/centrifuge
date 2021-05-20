import { DirectoryTree } from "directory-tree";
import React, { Component, useState } from "react";
import { Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { FaChevronRight } from "react-icons/fa";
import ElectronAPI, { OpenFileResponse } from "../../utility/electronApi";
import { RootState } from "../../redux/store";
import styles from "./FileExplorer.module.scss";
import { OPEN_DIR, OPEN_PATTERN_FILE } from "../../utility/electronChannels";
import classNames from "classnames";
import { addEditor } from "../../redux/editors/editorActions";

declare const electron: ElectronAPI;

export class FileExplorerProps {
  directoryTree?: DirectoryTree;
}

interface TreeNodeProps {
  node: DirectoryTree;
  depth: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, depth }) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const hasChildren = node?.children?.length ? true : false;
  const isDirectory = node.type === "directory";

  const openFile = async (path: string) => {
    const response: OpenFileResponse = await electron.invoke(
      OPEN_PATTERN_FILE,
      path
    );
    if (response.status === "ok") {
      dispatch(
        addEditor({
          title: node.name,
          path: node.path,
          model: response.payload.data,
        })
      );
    } else {
      console.error(response.msg);
    }
  };

  return (
    <li className={classNames(styles.DTreeNode)}>
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
          if (node.extension === ".ctr") {
            openFile(node.path);
          }
        }}
      >
        {isDirectory && (
          <div
            className={classNames("d-inline", "mx-1", styles.DTreeToggler, {
              [styles.active]: !collapsed,
            })}
          >
            <FaChevronRight />
          </div>
        )}
        {node.name}
      </div>

      {isDirectory && !collapsed && hasChildren && (
        <ul className={classNames(styles.DTreeContainer)}>
          {node.children.map((child, index) => {
            return (
              <TreeNode
                key={node.name + "_child_" + index}
                node={child}
                depth={depth + 1}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
};

export class FileExplorer extends Component<FileExplorerProps> {
  openDirectory() {
    electron.send(OPEN_DIR);
  }

  render() {
    return (
      <div className={styles.FileExplorer}>
        {this.props.directoryTree ? (
          <ul className={classNames(styles.DTreeContainer)}>
            <TreeNode node={this.props.directoryTree} depth={0} />
          </ul>
        ) : (
          <div style={{ padding: "16px" }}>
            <p>No Open Folder</p>
            <Button variant="primary" onClick={this.openDirectory}>
              Open Folder
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): FileExplorerProps => ({
  directoryTree: state.fileTree.directoryTree,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorer);
