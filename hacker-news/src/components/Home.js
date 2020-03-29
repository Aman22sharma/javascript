import React from "react";
import { Tab, Container, Row, Col, Nav } from "react-bootstrap";
import MyCard from "./MyCard";

const Home = ({ top, latest, ask, show, job }) => {
  return (
    <Container fluid style={{ paddingBottom: "4.75rem" }}>
      <Tab.Container id="primaryTab" defaultActiveKey="top">
        <Row>
          <Col sm={12}>
            <div className="py-3 px-0 p-md-3 d-flex justify-content-center align-content-center align-items-center fixed-bottom bg-dark">
              <Nav variant="pills" className="mx-auto">
                <Nav.Item>
                  <Nav.Link className="text-white" eventKey="top">
                    Top
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-white" eventKey="ask">
                    Ask
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-white" eventKey="show">
                    Show
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-white" eventKey="job">
                    Jobs
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-white" eventKey="latest">
                    New
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          <Col sm={12}>
            <Tab.Content className="pt-3">
              <Tab.Pane eventKey="top">
                <MyCard card={top} />
              </Tab.Pane>
              <Tab.Pane eventKey="ask">
                <MyCard card={ask} />
              </Tab.Pane>
              <Tab.Pane eventKey="show">
                <MyCard card={show} />
              </Tab.Pane>
              <Tab.Pane eventKey="job">
                <MyCard card={job} />
              </Tab.Pane>
              <Tab.Pane eventKey="latest">
                <MyCard card={latest} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Home;
