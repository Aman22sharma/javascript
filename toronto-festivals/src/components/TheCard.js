import React from "react";
import {
  Card,
  ListGroup,
  ButtonGroup,
  Accordion
} from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import Toggle from "./Toggle";
import CardImage from "./CardImage";
import CardDesc from "./CardDesc";
import CardOrgName from "./CardOrgName";
import CardPartName from "./CardPartName";
import CardOrgAddr from "./CardOrgAddr";
import CardOrgType from "./CardOrgType";
import CardOrgPhone from "./CardOrgPhone";
import CardOrgEmail from "./CardOrgEmail";
import CardAccessibility from "./CardAccessibility";
import CardFrequency from "./CardFrequency";
import CardExpectedAvg from "./CardExpectedAvg";
import CardFreeEvent from "./CardFreeEvent";
import CardReservation from "./CardReservation";
import CardContactName from "./CardContactName";
import CardContactTitle from "./CardContactTitle";
import CardCategory from "./CardCategory";
import CardFeatures from "./CardFeatures";
import CardEventSite from "./CardEventSite";
import CardEventEmail from "./CardEventEmail";
import CardReserveEmail from "./CardReserveEmail";
import CardReservePhone from "./CardReservePhone";
import CardReserveSite from "./CardReserveSite";

const TheCard = ({ festival, features, categories }) => {
  return (
    <Card
      className="border rounded shadow-lg mb-3 overflow-hidden"
      bg="dark"
      text="white"
      border="dark"
    >
      <Accordion.Toggle
        as={Card.Header}
        variant="link"
        eventKey={festival.recId}
        className="text-left text-decoration-none font-weight-bold text-capitalize"
      >
        <Toggle festival={festival} />
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={festival.recId}>
        <Card.Body className="p-0">
          <CardImage festival={festival} />
          <CardDesc festival={festival} />
          <ListGroup variant="flush">
            <ListGroup.Item className="text-capitalize" variant="primary">
              <p className="m-0">
                <CardOrgName festival={festival} />
                <CardPartName festival={festival} />
                <CardOrgAddr festival={festival} />
                <CardOrgType festival={festival} />
                <CardOrgPhone festival={festival} />
                <CardOrgEmail festival={festival} />
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item className="text-capitalize" variant="warning">
              <p className="m-0">
                <CardAccessibility festival={festival} />
                <CardFrequency festival={festival} />
                <CardExpectedAvg festival={festival} />
                <CardFreeEvent festival={festival} />
                <CardReservation festival={festival} />
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item className="text-capitalize" variant="info">
              <div className="m-0">
                <CardContactName festival={festival} />
                <CardContactTitle festival={festival} />
                <CardCategory festival={festival} categories={categories} />
                <div className="d-flex flex-column flex-md-row justify-content-between align-content-center align-items-center mt-3">
                  <ButtonGroup className="mb-3 mb-md-0">
                    <CardEventSite festival={festival} />
                    <CardEventEmail festival={festival} />
                    <CardReserveEmail festival={festival} />
                    <CardReservePhone festival={festival} />
                    <CardReserveSite festival={festival} />
                  </ButtonGroup>
                  <div className="d-flex justify-content-between align-content-center align-items-center">
                    <CardFeatures festival={festival} features={features} />
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ReactTooltip />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default TheCard;
