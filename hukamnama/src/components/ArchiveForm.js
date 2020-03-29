import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";

const ArchiveForm = ({ handleArchive, handleReset, archiveDate }) => {
  return (
    <Container>
      <Row>
        <Col xs={12} className="mt-3">
          <p className="m-0 mb-1 text-center text-white font-weight-bold">Read Hukamnama (from Archives):</p>
          <InputGroup className="d-flex justify-content-center mb-3">
            <DatePicker
              as={FormControl}
              selected={archiveDate}
              onChange={e => handleArchive(e)}
              dateFormat="yyyy/MM/dd"
              minDate={new Date(1, 1, 2002)}
              maxDate={new Date()}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="warning" onClick={e => handleReset(e)}>
                Reset
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ArchiveForm;
