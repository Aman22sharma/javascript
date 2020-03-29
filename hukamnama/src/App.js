import React, { useState, useEffect } from "react";
import Loading from "./components/Loading";
import PublishDate from "./components/PublishDate";
import Hukamnama from "./components/Hukamnama";
import Author from "./components/Author";
import Raag from "./components/Raag";
import ArchiveForm from "./components/ArchiveForm";
import moment from "moment";
import "./App.scss";

const App = () => {
  const [hukamnama, setHukamnama] = useState([]);
  const [archiveDate, setArchiveDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getHukamnama(archiveDate);
  }, [archiveDate]);
  const getHukamnama = async date => {
    const filter = moment(date).isSame(moment(), "day")
      ? "today"
      : moment(date).format("YYYY/MM/DD");
    const result = await fetch(
      `https://api.gurbaninow.com/v2/hukamnama/${filter}`
    );
    const json = await result.json();
    setHukamnama(json);
    setLoading(false);
  };
  const handleArchive = e => setArchiveDate(e);
  const handleReset = e => {
    e.preventDefault();
    setArchiveDate(new Date());
  };
  if (loading || hukamnama === undefined || hukamnama.length === 0)
    return <Loading />;
  return (
    <>
      <nav className="fixed-top shadow-lg">
        <ArchiveForm
          archiveDate={archiveDate}
          handleArchive={handleArchive}
          handleReset={handleReset}
        />
      </nav>
      <header className="d-flex flex-column text-white flex-md-row justify-content-md-center align-content-md-center">
        <section className="flex-fill text-center px-3 py-5 p-md-5">
          <PublishDate date={hukamnama.date.gregorian} />
          <PublishDate date={hukamnama.date.nanakshahi.english} />
          <PublishDate date={hukamnama.date.nanakshahi.punjabi} language="PB" />
        </section>
        <section className="flex-fill text-center px-3 py-5 p-md-5">
          <Author author={hukamnama.hukamnamainfo.source} />
          <Author author={hukamnama.hukamnamainfo.writer} />
          <Raag raag={hukamnama.hukamnamainfo.raag} />
        </section>
      </header>
      <main className="d-flex flex-column text-white">
        <section className="flex-fill text-center px-3 py-5 p-md-5">
          <Hukamnama hukamnama={hukamnama} language="PB" />
        </section>
        <section className="flex-fill text-center px-3 py-5 p-md-5">
          <Hukamnama hukamnama={hukamnama} language="HI" />
        </section>
        <section className="flex-fill text-center px-3 py-5 p-md-5">
          <Hukamnama hukamnama={hukamnama} language="EN" />
        </section>
        <section className="flex-fill text-center px-3 py-5 p-md-5">
          <Hukamnama hukamnama={hukamnama} language="SP" />
        </section>
      </main>
    </>
  );
};

export default App;
