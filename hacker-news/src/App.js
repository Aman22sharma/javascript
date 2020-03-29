import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import StoryApi from "./api/StoryApi";

const App = ({
  hasError,
  loading,
  topStories,
  latestStories,
  askStories,
  showStories,
  jobStories
}) => {
  if (hasError) return <ErrorMessage />;

  if (loading) return <Loading />;

  return (
    <Home
      top={topStories}
      latest={latestStories}
      ask={askStories}
      show={showStories}
      job={jobStories}
    />
  );
};

// use High Order Component to extract out data fetch code
// https://reactjs.org/docs/higher-order-components.html
const withData = InputComponent => {
  return () => {
    const [hasError, setError] = useState(null);
    const [topStories, setTopStories] = useState([]);
    const [latestStories, setLatestStories] = useState([]);
    const [askStories, setAskStories] = useState([]);
    const [showStories, setShowStories] = useState([]);
    const [jobStories, setJobStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      StoryApi.getStories()
        .then(data => {
          setTopStories(data.topStories);
          setLatestStories(data.latestStories);
          setAskStories(data.askStories);
          setShowStories(data.showStories);
          setJobStories(data.jobStories);
          setLoading(false);
        })
        .catch(error => setError(error));
    }, []);

    return (
      <InputComponent
        loading={loading}
        hasError={hasError}
        topStories={topStories}
        latestStories={latestStories}
        askStories={askStories}
        showStories={showStories}
        jobStories={jobStories}
      />
    );
  };
};

export default withData(App);
