import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export interface CodeModalProps {
  code: string;
  show?: boolean;
  onHide?: () => void;
}

export interface CodeModalState {
  code: string;
}

const CodeModal: React.FC<CodeModalProps> = ({ code, onHide, show }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-90w modal-90h"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Datascript Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          readOnly={true}
          rows={10}
          style={{ width: '100%', height: '100%' }}
          value={code || ''}
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CodeModal;
