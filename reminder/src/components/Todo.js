import React, { useState } from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";

const Todo = ({ todo, index, handleToggleComplete, handleDeleteTodo }) => {
  const [completeButtonSkin, setCompleteButtonSkin] = useState(false);
  return (
    <Card
      bg={todo.isComplete ? "success" : "light"}
      text={todo.isComplete ? "white" : "dark"}
      className={todo.isComplete ? "shadow" : "shadow-sm"}
    >
      <Card.Body>
        <Card.Title className="m-0">{todo.text}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <ButtonGroup>
          <Button
            variant={completeButtonSkin ? "dark" : "warning"}
            onClick={() =>
              handleToggleComplete(
                index,
                todo,
                completeButtonSkin,
                setCompleteButtonSkin
              )
            }
            disabled={completeButtonSkin ? true : false}
          >
            {completeButtonSkin ? "Done" : "Pending"}
          </Button>
          <Button variant="danger" onClick={() => handleDeleteTodo(index)}>
            Remove
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
};

export default Todo;
