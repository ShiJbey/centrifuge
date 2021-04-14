import React, { useState } from 'react';
import { BaseModel, BaseModelGenerics } from '@projectstorm/react-canvas-core';
import Form from 'react-bootstrap/Form';

interface NodeData {
  label?: string,
  age?: string,
  occupation?: string,
  sex?: string,
  alive?: boolean,

}

interface PersonNodeInspectorProps {
  nodeData?: NodeData;
  onDataChange?: (data: NodeData) => void;
}

const AGE_OPTIONS = [
  'any',
  'child',
  'adult',
  'elderly',
];

const PersonNodeInspector: React.FC<PersonNodeInspectorProps> = (props) => {

  const [nodeData, setNodeData] = useState(props.nodeData);
  const [label, setLabel] = useState(props.nodeData.label);
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [sex, setSex] = useState('');
  const [alive, setAlive] = useState(true);

  function emitDataChange() {
    if (props.onDataChange) {
      props.onDataChange({
        label, age, sex, occupation, alive
      });
    }
  }

  return (
    <div className="p-2" style={{ color: 'white' }}>
      <div className="title text-center" style={{ fontSize: 'large' }}>
        Node Inspector
      </div>
      <Form>
        <Form.Group>
          <Form.Label>Node Label</Form.Label>
          <Form.Control type="text" value={label} onChange={(event) => {setLabel(event.target.value); emitDataChange();}} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control as="select" value={age} onChange={(event) => {setAge(event.target.value); emitDataChange();}}>
            {AGE_OPTIONS.map((opt) => (
              <option>{opt}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sex</Form.Label>
          <Form.Control as="select" value={sex} onChange={(event) => {setSex(event.target.value); emitDataChange()}}>
            <option>any</option>
            <option>male</option>
            <option>female</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className='mr-2'>Alive</Form.Label>
          <Form.Check inline type="checkbox" checked={alive} onChange={(event) => setAlive(event.currentTarget.checked)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Occupation</Form.Label>
          <Form.Control type="text" value={occupation} onChange={(event) => setOccupation(event.target.value)} />
        </Form.Group>
      </Form>
    </div>
  );
};

export default PersonNodeInspector;
