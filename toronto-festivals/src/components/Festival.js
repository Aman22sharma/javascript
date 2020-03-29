import React from "react";
import TheCard from "./TheCard";
import { Col } from "react-bootstrap";

const Festival = ({ festival, features }) => {
  const categories = festival.categoryString
    ? festival.categoryString.split(",")
    : null;
  return (
    <Col xs={12} lg={6} xl={4}>
      <TheCard
        festival={festival}
        features={features}
        categories={categories}
      />
    </Col>
  );
};

export default Festival;
