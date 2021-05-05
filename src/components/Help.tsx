import React from "react";

const Help: React.FC = () => {
  return (
    <div className="container">
      <h1>Editor Help</h1>
      <h2>Creating Nodes</h2>
      <p>Drag a node type from the right menu to the grid</p>
      <h2>Creating Links</h2>
      <p>
        Click and drag from the squares next to the input/output labels on a
        node.
      </p>
      <h2>Deleting links</h2>
      <p>
        hold <code>Shift</code> and left click. Then click <code>delete</code>
      </p>
    </div>
  );
};

export default Help;
