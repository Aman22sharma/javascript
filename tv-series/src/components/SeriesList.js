import React from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardColumns,
  ListGroup
} from "react-bootstrap";

const SeriesImage = ({ series }) => (
  <Card.Img
    variant="top"
    src={
      series.show.image.original
        ? series.show.image.original
        : "https://placekitten.com/200/200"
    }
  />
);
const SeriesScore = ({ series }) => (
  <Badge variant="secondary">{series.score.toFixed(2)}</Badge>
);
const SeriesName = ({ series }) => (
  <p className="m-0">
    {series.show.name ? series.show.name : "No name available."}
  </p>
);
const SeriesGenre = ({ series }) => (
  <ListGroup.Item>
    <span>
      Genre:{" "}
      {series.show.genres === undefined || series.show.genres.length === 0
        ? "No generes available."
        : series.show.genres.join("-")}
    </span>
  </ListGroup.Item>
);
const SeriesVariety = ({ series }) => (
  <ListGroup.Item>
    <span>
      Variety:{" "}
      {series.show.variety ? series.show.variety : "No vareity available."}
    </span>
  </ListGroup.Item>
);
const SeriesLanguage = ({ series }) => (
  <ListGroup.Item>
    <span>
      Language:{" "}
      {series.show.language ? series.show.language : "No language available."}
    </span>
  </ListGroup.Item>
);
const SeriesStatus = ({ series }) => (
  <ListGroup.Item>
    <span>
      Status: {series.show.status ? series.show.status : "No status available."}
    </span>
  </ListGroup.Item>
);
const SeriesSummary = ({ series }) => (
  <ListGroup.Item>
    <span>
      Summary:{" "}
      {series.show.summary
        ? series.show.summary.replace(/<[^>]*>?/gm, "")
        : "No summary available."}
    </span>
  </ListGroup.Item>
);
const SeriesPremiered = ({ series }) => (
  <ListGroup.Item>
    <span>
      Premiered:{" "}
      {series.show.premiered ? series.show.premiered : "No premiers available."}
    </span>
  </ListGroup.Item>
);
const SeriesDays = ({ series }) => (
  <ListGroup.Item>
    <span>
      Days:{" "}
      {series.show.schedule.days === undefined ||
        series.show.schedule.days.length === 0
        ? "No days available."
        : series.show.schedule.days.join("-")}
    </span>
  </ListGroup.Item>
);
const SeriesTime = ({ series }) => (
  <ListGroup.Item>
    <span>
      Time:{" "}
      {series.show.schedule.time
        ? series.show.schedule.time
        : "No timings available."}
    </span>
  </ListGroup.Item>
);
const SeriesNetworkName = ({ series }) => (
  <ListGroup.Item>
    <span>
      Network:{" "}
      {series.show.network.name
        ? series.show.network.name
        : "No network name available."}
    </span>
  </ListGroup.Item>
);
const SeriesCountry = ({ series }) => (
  <ListGroup.Item>
    <span>
      Country:{" "}
      {series.show.network.country.name
        ? series.show.network.country.name
        : "No country origin available."}
    </span>
  </ListGroup.Item>
);
const SeriesCode = ({ series }) => (
  <ListGroup.Item>
    <span>
      Country Code:{" "}
      {series.show.network.country.code
        ? series.show.network.country.code
        : "No country code available."}
    </span>
  </ListGroup.Item>
);
const SeriesTimezone = ({ series }) => (
  <ListGroup.Item>
    <span>
      Timezone:{" "}
      {series.show.network.country.timezone
        ? series.show.network.country.timezone
        : "No timezone available."}
    </span>
  </ListGroup.Item>
);
const SeriesURL = ({ series }) => (
  <>
    <Button variant="primary" href={series.show.url} target="_blank">
      Read More
    </Button>
  </>
);
const SeriesSite = ({ series }) => (
  <>
    <Button variant="secondary" href={series.show.officialSite} target="_blank">
      View Series
    </Button>
  </>
);

const SeriesListItem = ({ series }) => {
  return (
    <Card className="text-center shadow">
      {series.show.image ? <SeriesImage series={series} /> : ""}
      <Card.Header>
        {series.show.name ? <SeriesName series={series} /> : ""}{" "}
        {series.score ? <SeriesScore series={series} /> : ""}
      </Card.Header>
      <Card.Body className="p-0">
        <ListGroup variant="flush" className="m-0">
          {series.show.genres ? <SeriesGenre series={series} /> : ""}
          {series.show.variety ? <SeriesVariety series={series} /> : ""}
          {series.show.language ? <SeriesLanguage series={series} /> : ""}
          {series.show.status ? <SeriesStatus series={series} /> : ""}
          {series.show.summary ? <SeriesSummary series={series} /> : ""}
          {series.show.premiered ? <SeriesPremiered series={series} /> : ""}
          {series.show.schedule ? <SeriesDays series={series} /> : ""}
          {series.show.schedule ? <SeriesTime series={series} /> : ""}
          {series.show.network ? <SeriesNetworkName series={series} /> : ""}
          {series.show.network ? <SeriesCountry series={series} /> : ""}
          {series.show.network ? <SeriesCode series={series} /> : ""}
          {series.show.network ? <SeriesTimezone series={series} /> : ""}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <ButtonGroup>
          {series.show.url ? <SeriesURL series={series} /> : ""}
          {series.show.officialSite ? <SeriesSite series={series} /> : ""}
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
};

const SeriesList = ({ list }) => {
  return (
    <CardColumns>
      {list.map(series => (
        <SeriesListItem key={series.show.id} series={series} />
      ))}
    </CardColumns>
  );
};

export default SeriesList;
