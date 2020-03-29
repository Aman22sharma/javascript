import React, { useState } from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import {
  Container,
  Row,
  Col,
  Navbar,
  CardColumns,
  Jumbotron
} from "react-bootstrap";

const App = ({ notes }) => {
  const [todos, setTodos] = useState(notes);
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
  const handleToggleComplete = (
    index,
    todo,
    completeButtonSkin,
    setCompleteButtonSkin
  ) => {
    const newTodos = [...todos];
    newTodos[index].isComplete = !todo.isComplete;
    setTodos(newTodos);
    setCompleteButtonSkin(!completeButtonSkin);
  };
  const handleDeleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <div className="pt-3" style={{ paddingBottom: "3.5rem" }}>
              {todos === undefined || todos.length === 0 ? (
                <Jumbotron>
                  <h1>No reminders yet!</h1>
                  <hr />
                  <p>Please add some reminders before you head out!</p>
                </Jumbotron>
              ) : (
                  <CardColumns>
                    {todos.map((todo, i) => (
                      <Todo
                        key={i}
                        index={i}
                        todo={todo}
                        handleToggleComplete={handleToggleComplete}
                        handleDeleteTodo={handleDeleteTodo}
                      />
                    ))}
                  </CardColumns>
                )}
            </div>
          </Col>
        </Row>
      </Container>
      <Navbar bg="light" expand="sm" fixed="bottom">
        <Navbar.Brand>Reminder</Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-navigation" />
        <Navbar.Collapse id="primary-navigation">
          <div className="ml-auto">
            <TodoForm addTodo={addTodo} />
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default App;
