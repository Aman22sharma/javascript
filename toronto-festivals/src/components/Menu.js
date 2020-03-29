import React from "react";
import {
  Navbar,
  Nav,
  Form
} from "react-bootstrap";
import moment from "moment";

const Menu = ({ festivals, filterMonth, handleFilterMonth }) => {
  let beginMonths = [
    ...new Set(festivals.map(item => moment(item.calEvent.endDate).month()))
  ];
  let endMonths = [
    ...new Set(festivals.map(item => moment(item.calEvent.startDate).month()))
  ];
  let allMonths = [...new Set([...beginMonths, ...endMonths])];
  return (
    <Navbar
      variant="light"
      bg="white"
      expand="lg"
      fixed="bottom"
      className="shadow-lg"
    >
      <Nav className="w-100">
        <Form className="w-100" inline>
          <Form.Control
            as="select"
            className="w-100"
            name="filterMonth"
            value={filterMonth}
            onChange={e => handleFilterMonth(e)}
          >
            {allMonths
              .sort((a, b) => a - b)
              .map((i, k) => (
                <option key={k} value={i}>
                  {moment()
                    .month(i)
                    .format("MMMM")}
                </option>
              ))}
          </Form.Control>
        </Form>
      </Nav>
    </Navbar>
  );
};

export default Menu;
