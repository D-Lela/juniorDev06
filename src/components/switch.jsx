import Form from 'react-bootstrap/Form';

export default function Switch(props) {
  return (
    <Form.Switch>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={props.admin}
        onChange={props.akcija}
      />
      <label>Admin</label>
    </Form.Switch>
  );
}
