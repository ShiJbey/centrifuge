import * as React from 'react';
import Form from 'react-bootstrap/Form';
import _ from 'lodash';
import { PersonNodeModelOptions } from '../nodes/PersonNode/PersonNodeModel';


interface PersonNodeInspectorProps {
  nodeData?: PersonNodeModelOptions;
  onDataChange?: (data: PersonNodeModelOptions) => void;
}

interface PersonNodeInspectorState {
  label?: string;
  color?: string;
  age?: string;
  occupation?: string;
  sex?: string;
  alive?: boolean;
}

const AGE_OPTIONS = [
  'any',
  'child',
  'adult',
  'elderly',
];


class PersonNodeInspector extends React.Component<PersonNodeInspectorProps, PersonNodeInspectorState> {

  constructor(props: PersonNodeInspectorProps) {
    super(props);
    this.state = {
      label: this.props?.nodeData?.label ?? '',
      age: this.props?.nodeData?.age ?? '',
    };
  }

  static getDerivedStateFromProps(props: PersonNodeInspectorProps, state: PersonNodeInspectorState): PersonNodeInspectorState | null {
    if(props.nodeData && !_.isEqual(props.nodeData, state)){
        return {
          label: props?.nodeData?.label ?? '',
          age: props?.nodeData?.age ?? '',
        };
    }
    return null;
  }

  loadNode(options: PersonNodeModelOptions): void {
    this.setState({
      label: options?.label ?? '',
      age: options?.age ?? '',
    });
  }

  emitDataChange(data?: PersonNodeModelOptions): void {
    if (this.props.onDataChange) {
      this.props.onDataChange(data ?? {...this.state});
    }
  }

  render(): React.ReactNode {
    return (
      <div className="p-2" style={{ color: 'white' }}>
        <div className="title text-center" style={{ fontSize: 'large' }}>
          Node Inspector
        </div>
        <Form onSubmit={(event) => {event.preventDefault(); this.emitDataChange();}}>
          <Form.Group>
            <Form.Label>Node Label</Form.Label>
            <Form.Control type="text" value={this.state.label} onChange={(event) => {this.setState({...this.state, label: event.target.value}); this.emitDataChange({...this.state, label: event.target.value});}} />
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control as="select" value={age} onChange={(event) => {setAge(event.target.value); emitDataChange();}}>
              {AGE_OPTIONS.map((opt, index) => (
                <option key={index}>{opt}</option>
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
          </Form.Group> */}
        </Form>
      </div>
    );
  }
}

export default PersonNodeInspector;
