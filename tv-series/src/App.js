import React from "react";
import Series from "./components/Series";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  return (
    <Container fluid style={{ paddingBottom: "3.75rem" }}>
      <Row>
        <Col xs={12}>
          <Series />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
