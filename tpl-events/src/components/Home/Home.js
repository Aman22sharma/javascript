import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  CardColumns,
  Form,
  Navbar,
  Nav
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faExternalLinkAlt,
  faInfoCircle,
  faHourglassStart,
  faHourglassEnd,
  faCalendarPlus,
  faUserPlus,
  faCalendarMinus,
  faBookmark,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { chunk, sortBy, uniqBy, map as pluck } from "lodash";
import "./Home.scss";

const EventTitle = ({ event }) => (
  <>
    <h2 className="h5 m-0">
      <span className="font-weight-bold text-capitalize">
        <span>
          <FontAwesomeIcon icon={faBookmark} />
        </span>
        <span className="ml-2">Title:</span>
      </span>
      <span className="mx-2 text-capitalize">{event.title}</span>
    </h2>
  </>
);

const EventAgeGroup = ({ event }) => (
  <>
    <span className="font-weight-bold text-capitalize">
      <span>
        <FontAwesomeIcon icon={faUserPlus} />
      </span>
      <span className="ml-2">Age groups:</span>
    </span>
    <span className="mx-2 text-capitalize">{event.agegroups}</span>
  </>
);

const EventDate = ({ event }) => (
  <>
    <span className="font-weight-bold text-capitalize">
      <span>
        <FontAwesomeIcon icon={faCalendarPlus} />
      </span>
      <span className="ml-2">Date:</span>
    </span>
    <span className="mx-2 text-capitalize">{event.date}</span>
  </>
);

const EventEndDate = ({ event }) => (
  <>
    <span className="font-weight-bold text-capitalize">
      <span>
        <FontAwesomeIcon icon={faCalendarMinus} />
      </span>
      <span className="ml-2">End Date:</span>
    </span>
    <span className="mx-2 text-capitalize">{event.enddate}</span>
  </>
);

const EventTime = ({ event }) => (
  <>
    <span className="font-weight-bold text-capitalize">
      <span>
        <FontAwesomeIcon icon={faHourglassStart} />
      </span>
      <span className="ml-2">Time:</span>
    </span>

    <span className="mx-2 text-capitalize">{event.time}</span>
  </>
);

const EventEndTime = ({ event }) => (
  <>
    <span className="font-weight-bold text-capitalize">
      <span>
        <FontAwesomeIcon icon={faHourglassEnd} />
      </span>
      <span className="ml-2">End Time:</span>
    </span>
    <span className="mx-2 text-capitalize">{event.endtime}</span>
  </>
);

const EventInfo = ({ event }) => (
  <>
    <span className="font-weight-bold text-capitalize">
      <span>
        <FontAwesomeIcon icon={faInfoCircle} />
      </span>
      <span className="ml-2">Description:</span>
    </span>
    <span className="mx-2 text-capitalize">
      {event.description.replace(/<[^>]*>?/gm, "")}
    </span>
  </>
);

const EventLink = ({ event }) => (
  <>
    <Button variant="dark" as={Card.Link} href={event.link} target="_blank">
      <span>
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </span>
      <span className="ml-2">View event</span>
    </Button>
  </>
);

const EventLocation = ({ event }) => (
  <>
    <span className="font-weight-bold">
      <span>
        <FontAwesomeIcon icon={faMapMarker} />
      </span>
      <span className="ml-2">Library:</span>
    </span>
    <span className="mx-2">{event.library}</span>
  </>
);

const Library = ({ event }) => {
  let now = new Date().getTime();
  let eventDate = new Date(event.date).getTime();
  return (
    <Card
      bg={now <= eventDate ? "success" : "danger"}
      text="white"
      className="shadow-sm"
    >
      <Card.Header>{event.title && <EventTitle event={event} />}</Card.Header>
      <ListGroup className="list-group-flush">
        {event.time && (
          <ListGroupItem variant={now <= eventDate ? "success" : "danger"}>
            <EventTime event={event} />
          </ListGroupItem>
        )}
        {event.endtime && (
          <ListGroupItem variant={now <= eventDate ? "success" : "danger"}>
            <EventEndTime event={event} />
          </ListGroupItem>
        )}
        {event.date && (
          <ListGroupItem variant={now <= eventDate ? "success" : "danger"}>
            <EventDate event={event} />
          </ListGroupItem>
        )}
        {event.enddate && (
          <ListGroupItem variant={now <= eventDate ? "success" : "danger"}>
            <EventEndDate event={event} />
          </ListGroupItem>
        )}
        {event.agegroups && (
          <ListGroupItem variant={now <= eventDate ? "success" : "danger"}>
            <EventAgeGroup event={event} />
          </ListGroupItem>
        )}
        {event.description && (
          <ListGroupItem variant={now <= eventDate ? "success" : "danger"}>
            <EventInfo event={event} />
          </ListGroupItem>
        )}
        {event.library && (
          <ListGroupItem variant={now <= eventDate ? "success" : "danger"}>
            <EventLocation event={event} />
          </ListGroupItem>
        )}
      </ListGroup>
      <Card.Footer>{event.link && <EventLink event={event} />}</Card.Footer>
    </Card>
  );
};

const Error = ({ error }) => {
  return (
    <div className="bg-dark d-flex justify-content-center align-items-center min-vh-100 text-center">
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className="m-0 text-secondary">{error.message}</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="bg-dark d-flex justify-content-center align-items-center min-vh-100 text-center">
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className="m-0 text-secondary mb-3">Loading, Please wait...</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Content = ({
  data,
  handleClick,
  handleByLibrary,
  handleByDate,
  handleByTime,
  handleByTitle,
  selectLibrary,
  selectedLibrary,
  handleSelectLibrary
}) => {
  return (
    <>
      <div className="bg-dark pt-3 pb-5">
        <h1 className="text-white text-center mb-3">
          Toronto Public Library Events
        </h1>
        <Container fluid>
          <Row>
            <Col xs={12} className="sticky-top sticky">
              <div className="bg-plastic shadow rounded pt-2 px-3 mb-3">
                <Row>
                  <Col xs={12} md={6}>
                    <Filters
                      handleByLibrary={handleByLibrary}
                      handleByDate={handleByDate}
                      handleByTime={handleByTime}
                      handleByTitle={handleByTitle}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <SelectLibrary
                      selectLibrary={selectLibrary}
                      selectedLibrary={selectedLibrary}
                      handleSelectLibrary={handleSelectLibrary}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={12}>
              <CardColumns>
                {data.map((event, i) => (
                  <Library event={event} key={i} />
                ))}
              </CardColumns>
            </Col>
          </Row>
        </Container>
        <SecondaryNav handleClick={handleClick} />
      </div>
    </>
  );
};

const SecondaryNav = ({ handleClick }) => {
  return (
    <Navbar
      expand="lg"
      variant="light"
      fixed="bottom"
      className="bg-water shadow-lg"
    >
      <Container>
        <Nav.Link
          variant="dark"
          as={Button}
          onClick={handleClick}
          className="mx-auto shadow-lg"
        >
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span className="ml-2">Load more Events</span>
        </Nav.Link>
      </Container>
    </Navbar>
  );
};

const CapMessage = ({ showCapMessage, handleCloseCapMessage }) => {
  return (
    <Modal show={showCapMessage} onHide={handleCloseCapMessage}>
      <Modal.Header closeButton>
        <Modal.Title>Error!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        There are no more events available to show in Toronto Public Library.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseCapMessage}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Filters = ({
  handleByLibrary,
  handleByDate,
  handleByTime,
  handleByTitle
}) => {
  return (
    <Form.Group controlId="selectLibrary" className="m-0">
      <Form.Label className="text-dark">Sort by:</Form.Label>
      <ButtonGroup aria-label="Filters" className="mb-3 w-100">
        <Button variant="primary" onClick={handleByLibrary}>
          Library
        </Button>
        <Button variant="info" onClick={handleByTitle}>
          Title
        </Button>
        <Button variant="warning" onClick={handleByTime}>
          Time
        </Button>
        <Button variant="dark" onClick={handleByDate}>
          Date
        </Button>
      </ButtonGroup>
    </Form.Group>
  );
};

const SelectLibrary = ({
  selectLibrary,
  selectedLibrary,
  handleSelectLibrary
}) => {
  return (
    <Form.Group controlId="selectLibrary">
      <Form.Label className="text-dark">Select a Library:</Form.Label>
      <Form.Control
        as="select"
        onChange={event => handleSelectLibrary(event)}
        value={selectedLibrary}
      >
        <option>Select a Library</option>
        {selectLibrary.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [selectLibrary, setSelectLibrary] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState("");
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCapMessage, setShowCapMessage] = useState(false);
  const [capMessageLoadButton, setCapMessageLoadButton] = useState(false);
  useEffect(() => {
    setLoading(true);
    const API = `https://cors-anywhere.herokuapp.com/https://opendata.tpl.ca/resources/events`;
    // const API = "./data.json";
    axios(API)
      .then(response => {
        let chunks = chunk(response.data, 50);
        let libraries = uniqBy(response.data, e => e.library);
        let libraryList = pluck(libraries, "library");
        let sortedLibraryList = sortBy(libraryList);
        setAllData(response.data);
        setData(chunks);
        setCurrentPage(chunks[page]);
        setSelectLibrary(sortedLibraryList);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);
  const handleByLibrary = () => {
    setCurrentPage([...sortBy(currentPage, [e => e.library])]);
  };
  const handleByDate = () => {
    let sortedArray = sortBy(currentPage, [e => e.date]);
    setCurrentPage([...sortedArray]);
  };
  const handleByTime = () => {
    let sortedArray = sortBy(currentPage, [e => e.time]);
    setCurrentPage([...sortedArray]);
  };
  const handleByTitle = () => {
    let sortedArray = sortBy(currentPage, [e => e.title]);
    setCurrentPage([...sortedArray]);
  };
  const handleSelectLibrary = event => {
    if (event.target.value === "Select a Library") {
      setSelectedLibrary("");
      return;
    }
    setSelectedLibrary(event.target.value);
    let libraryArray = allData.filter(
      item => item.library === event.target.value
    );
    let sortedArray = sortBy(libraryArray, [e => e.library]);
    setCurrentPage([...sortedArray]);
  };
  const handleCloseCapMessage = () => setShowCapMessage(false);
  const handleClick = () => {
    if (data[page] === undefined || data[page].length === 0) {
      setShowCapMessage(true);
      setCapMessageLoadButton(true);
      return;
    }
    let uniqueItems = [...currentPage, ...data[page]];
    let filteredItems = uniqBy(uniqueItems, e => e.title);
    setSelectedLibrary("");
    setLoading(true);
    setPage(page + 1);
    setCurrentPage([...filteredItems]);
    setLoading(false);
  };
  if (error) {
    return <Error error={error} />;
  }
  if (loading || currentPage === undefined || currentPage.length === 0) {
    return <Loading />;
  }
  return (
    <>
      <Content
        data={currentPage}
        handleClick={handleClick}
        handleByLibrary={handleByLibrary}
        handleByDate={handleByDate}
        handleByTime={handleByTime}
        handleByTitle={handleByTitle}
        capMessageLoadButton={capMessageLoadButton}
        selectLibrary={selectLibrary}
        selectedLibrary={selectedLibrary}
        handleSelectLibrary={handleSelectLibrary}
      />
      <CapMessage
        showCapMessage={showCapMessage}
        handleCloseCapMessage={handleCloseCapMessage}
      />
    </>
  );
};

export default Home;
