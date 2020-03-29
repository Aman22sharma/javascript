import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import Festival from "./Festival";

const Cards = ({ data }) => {
  const allFeatures = data.map(i => i.calEvent.features);
  const uniqueFeatures = Object.keys(Object.assign({}, ...allFeatures));
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Accordion
            as={Row}
            className="mt-3"
            style={{ paddingBottom: "3.5rem" }}
          >
            {data
              .sort((a, b) =>
                a.calEvent.eventName.localeCompare(b.calEvent.eventName)
              )
              .map(item => (
                <Festival
                  key={item.calEvent.recId}
                  festival={item.calEvent}
                  features={uniqueFeatures}
                />
              ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Cards;
