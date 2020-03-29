import React from "react";
import moment from "moment";
import { AiFillHeart, AiFillCalendar } from "react-icons/ai";
import { Row, Col, CardColumns, Card } from "react-bootstrap";


const Item = ({ item }) => {
  return (
    <Card className="shadow-lg">
      <Card.Body>
        {item.title && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-decoration-none
          "
          >
            <Card.Title>{item.title}</Card.Title>
          </a>
        )}
        {item.by && (
          <Card.Subtitle className="mb-3 text-muted text-capitalize">
            By: {item.by}
          </Card.Subtitle>
        )}
        <div className="d-flex flex-wrap justify-content-between align-content-end align-items-end">
          <div>
            {item.score && (
              <Card.Text className="m-0 text-danger text-capitalize d-flex align-content-center align-items-center">
                <AiFillHeart />
                <small className="ml-1">{item.score}</small>
              </Card.Text>
            )}
          </div>
          <div className="d-flex flex-column align-items-end">
            {item.time && (
              <Card.Text className="m-0 text-dark text-capitalize d-flex align-content-center align-items-center">
                <AiFillCalendar />
                <small className="ml-1">
                  {moment.unix(item.time).fromNow()}
                </small>
              </Card.Text>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const MyCard = ({ card }) => {
  return (
    <Row>
      <Col xs={12}>
        <CardColumns>
          {card
            .sort((a, b) => b.time - a.time)
            .map(i => (
              <Item item={i} key={i.id} />
            ))}
        </CardColumns>
      </Col>
    </Row>
  );
};

export default MyCard;
