import React, { useState, useEffect } from "react";
import { sortBy } from "lodash";
import "./App.scss";

const Station = ({ station }) => {
  return (
    <div className="station d-flex justify-content-between">
      <div className="d-flex flex-column">
        <a
          className="station__link text-white d-flex text-decoration-none text-success"
          href={station.website}
          rel="noopener noreferrer"
          target="_blank"
        >
          <h2 className="d-flex align-items-center h2 station__title text-uppercase">
            <span className="d-flex mr-2">
              <i className="fa fa-external-link fa--link" aria-hidden="true"></i>
            </span>
            <span>{station.name}</span>
          </h2>
        </a>
        <small className="d-block mt-1 mb-0 station__subtitle">
          {station.summary}
        </small>
      </div>
      <div className="btns d-flex justify-content-end align-items-start ml-3 ml-md-5">
        <button
          className="rounded-circle btn btn-outline-light play d-flex justify-content-center align-content-center mr-3"
          data-sound={station.url}
        >
          <span className="sr-only">
            Listen to {station.name} radio station
          </span>
          <i className="fa fa-play"></i>
        </button>
        <button
          className="rounded-circle btn btn-outline-secondary pause d-flex justify-content-center align-items-center"
          data-sound={station.url}
        >
          <span className="sr-only">Pause {station.name} radio station</span>
          <i className="fa fa-pause"></i>
        </button>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <>
      <div className="loading">
        Please wait while we get stations for you...
      </div>
    </>
  );
};

const Footer = ({stations}) => {
  return (
    <>
      <footer className="footer text-center">
        <p>&copy; Peace on the street!</p>
        {stations && <p>Stations available for your entertainment: <strong>{stations.length}</strong></p>}
        <small>
          Message your favorite Toronto station to me, I'll add or report broken ones&nbsp;
          <a
            href="https://github.com/tpkahlon/react-projects.git"
            rel="noopener noreferrer"
            target="_blank"
            className="text-decoration-none"
          >
            here
          </a>
          !
        </small>
      </footer>
    </>
  );
};

const Header = () => {
  return (
    <>
      <article className="info">
        <h1 className="info__title text-success">listenTO</h1>
        <p className="info__subtitle text-white">
          Lightweight, Zero advertisement, Instant/Background playback, Your
          favorite radio stations from city of Toronto updated regularly!
        </p>
      </article>
    </>
  );
};

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`./data.json`)
      .then(blob => blob.json())
      .then(data => {
        setData(sortBy(data, "name"));
        // Write logic to replace manual code below
        const logic = () => {
          const playButton = document.querySelectorAll(".play");
          const pauseButton = document.querySelectorAll(".pause");
          const enableButton = btn => {
            btn.removeAttribute("disabled", "disabled");
            btn.classList.remove("disabled");
          };
          const disableButton = btn => {
            btn.setAttribute("disabled", "disabled");
            btn.classList.add("disabled");
          };
          const defaults = e => {
            e.preventDefault();
            e.stopPropagation();
          };
          let audio;
          playButton.forEach(btn => {
            btn.addEventListener("click", e => {
              defaults(e);
              let current = e.currentTarget;
              let track = current.dataset.sound;
              let sibling = current.closest(".btns").querySelector(".pause");
              let parent = current.closest(".station");
              sibling.classList.add("active");
              parent.classList.add("station--active");
              enableButton(sibling);
              disableButton(current);
              playButton.forEach(btn => disableButton(btn));
              audio = new Audio(track);
              audio.play();
              sibling.focus();
            });
          });
          pauseButton.forEach(btn => {
            disableButton(btn);
            btn.addEventListener("click", e => {
              defaults(e);
              let current = e.currentTarget;
              let sibling = current.closest(".btns").querySelector(".play");
              let parent = current.closest(".station");
              current.classList.remove("active");
              parent.classList.remove("station--active");
              enableButton(sibling);
              disableButton(current);
              playButton.forEach(btn => enableButton(btn));
              audio.pause();
              sibling.focus();
            });
          });
        };
        logic();
      });
  }, []);
  if (!data || data === undefined || data.length === 0)
    return (
      <>
        <div className="app">
          <Header />
          <Loading />
        </div>
        <Footer />
      </>
    );
  return (
    <>
      <div className="app">
        <Header />
        {data.map((item, i) => (
          <Station key={i} station={item} />
        ))}
      </div>
      <Footer stations={data} />
    </>
  );
};

export default App;
