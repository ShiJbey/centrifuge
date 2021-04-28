import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export interface CodeModalProps {
  show?: boolean;
  onHide?: () => void;
}

export interface CodeModalState {
  code: string;
}

const HelpModal: React.FC<CodeModalProps> = ({ onHide, show }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-90w modal-90h"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Help</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HelpModal;
