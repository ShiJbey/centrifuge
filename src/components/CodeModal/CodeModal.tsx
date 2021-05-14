import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export interface CodeModalProps {
  show?: boolean;
  onHide?: () => void;
}

const CodeModal: React.FC<CodeModalProps> = ({ onHide, show }) => {

  const activeEditor = useSelector(
    (state: RootState) => state.editor.activeEditor
  );
  const editors = useSelector((state: RootState) => state.editor.editors);

  let code = '';

  if (editors[activeEditor]) {
    code = editors[activeEditor].code;
  }

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
          value={code}
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
