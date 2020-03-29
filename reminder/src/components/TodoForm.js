import React, { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const handleInputChange = e => {
    setValue(e.target.value);
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    if (!value || value.trim() === "") return;
    addTodo(value);
    setValue("");
  };
  return (
    <Form inline onSubmit={e => handleFormSubmit(e)} className="mt-3 mt-sm-0">
      <Form.Row className="w-100 mx-0">
        <Col xs={12} sm className="px-0">
          <Form.Control
            placeholder="Enter a reminder..."
            onChange={e => handleInputChange(e)}
            value={value}
            required
            className="mb-3 mb-sm-0"
          />
        </Col>
        <Col xs={12} sm className="px-0 pl-sm-2">
          <Button variant="primary" type="submit" block>
            Save
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default TodoForm;
