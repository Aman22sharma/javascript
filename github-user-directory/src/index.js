import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
// import PropTypes from "prop-types";
import Header from "./components/Header/Header";
import Form from "./components/Header/Form/Form";
import WelcomeMessage from "./components/WelcomeMessage/WelcomeMessage";
import Notification from "./components/Notification/Notification";
import Listing from "./components/Listing/Listing";
import Owner from "./components/Owner/Owner";
import Footer from "./components/Footer/Footer";
import Filters from './components/Filters/Filters';
import { sortByStars, sortByForks, sortByWatchers, sortByIssues, sortByName, sortByDate } from './constants';
import "./index.css";

class App extends Component {
  state = {
    page: 1,
    data: [],
    user: [],
    call: [],
    emoji: [],
    error: null,
    searchTerm: "",
    moreButton: false,
    submitButton: false,
    welcomeMessage: true
  };
  getRepository = fetchedData => {
    if(fetchedData.length < 5) {
      this.setState(previousState => ({
        data: [...previousState.data, ...fetchedData],
        moreButton: false,
        submitButton: false,
        welcomeMessage: false
      }));
    } else {
      this.setState(previousState => ({
        data: [...previousState.data, ...fetchedData],
        moreButton: true,
        submitButton: false,
        welcomeMessage: false
      }));
    }
  };
  getUser = fetchedUser => {
    this.setState(previousState => ({
      user: fetchedUser
    }));
  };
  getCall = fetchedCall => {
    this.setState(previousState => ({
      call: fetchedCall
    }));
  };
  getEmoji = fetchedEmoji => {
    this.setState(previousState => ({
      emoji: fetchedEmoji
    }));
  };
  getError = error => {
    this.setState({ error });
  };
  handleChange = event => {
    if (!event.target.value) {
      this.setState({
        searchTerm: event.target.value,
        moreButton: false,
        submitButton: false,
        welcomeMessage: true,
        data: [],
        user: [],
        page: 1,
        error: null
      });
    } else {
      this.setState({
        searchTerm: event.target.value,
        moreButton: false,
        submitButton: true,
        welcomeMessage: true,
        data: [],
        user: [],
        page: 1,
        error: null
      });
    }
  };
  handleSubmit = event => {
    this.setState({ submitButton: false, welcomeMessage: false, error: null }, this.handleData);
    event.preventDefault();
  };
  handleMore = event => {
    this.setState(
      previousState => ({ page: previousState.page + 1, welcomeMessage: false }),
      this.handleData
    );
    event.preventDefault();
  };
  handleData = () => {
    this.handleCall();
    this.handleUser();
    const { page, searchTerm } = this.state;
    axios(`https://api.github.com/users/${searchTerm}/repos?sort=pushed&page=${page}&per_page=5`)
    .then(data => this.getRepository(data.data))
    .catch(error => this.getError(error));
  };
  handleUser = () => {
    const { searchTerm } = this.state;
    axios(`https://api.github.com/users/${searchTerm}`)
    .then(data => this.getUser(data.data))
    .catch(error => this.getError(error));
  };
  handleCall = () => {
    axios(`https://api.github.com/rate_limit`)
    .then(data => this.getCall(data.data))
    .catch(error => this.getError(error));
  };
  handleEmoji = () => {
    axios(`https://api.github.com/emojis`)
    .then(data => this.getEmoji(data.data))
    .catch(error => this.getError(error));
  }
  componentDidMount() {
    this.handleEmoji();
    this.handleCall();
  }
  handleSortByName = () => {
    const {data} = this.state;
    data.sort(sortByName);
    this.setState({data})
  }
  handleSortByDate = () => {
    const {data} = this.state;
    data.sort(sortByDate);
    this.setState({data})
  }
  handleSortByStars = () => {
    const {data, sortedByDate} = this.state;
    data.sort(sortByStars);
    this.setState({data, sortedByDate: !sortedByDate})
  }
  handleSortByForks = () => {
    const {data} = this.state;
    data.sort(sortByForks);
    this.setState({data})
  }
  handleSortByIssues = () => {
    const {data} = this.state;
    data.sort(sortByIssues);
    this.setState({data})
  }
  handleSortByWatchers = () => {
    const {data} = this.state;
    data.sort(sortByWatchers);
    this.setState({data})
  }
  render() {
    const { data, user, call, emoji, error, moreButton, submitButton, searchTerm, welcomeMessage } = this.state;
    return (
      <div>
        <nav className="navigation">
          <div className="container">
            <div className="row">
              <div className="col col-12 mt-3 mb-0">
                <Header title="git Developer Directory" />
              </div>
              <div className="col col-12">
                <Form
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  handleMore={this.handleMore}
                  inputValue={searchTerm}
                  buttonDisable={!submitButton && "disabled"}
                  moreButton={moreButton}
                />
              </div>
            </div>
          </div>
        </nav>
        <div className="container content my-3">
          <div className="row">
            <div className="col col-12">
              {
                (error || (!error && data.length === 0 && searchTerm.length !== 0 && !submitButton)) && <Notification />
              }
              {
                welcomeMessage &&
                <WelcomeMessage emoji={emoji} />
              }
              {
                (data && !(data.length < 1) && !welcomeMessage) &&
                <>
                  <Owner
                    title={data[0].owner.login}
                    thumb={data[0].owner.avatar_url}
                    link={data[0].owner.html_url}
                    user={user}
                  >See profile
                  </Owner>
                  <Filters
                    handleSortByName={this.handleSortByName}
                    handleSortByDate={this.handleSortByDate}
                    handleSortByStars={this.handleSortByStars}
                    handleSortByForks={this.handleSortByForks}
                    handleSortByIssues={this.handleSortByIssues}
                    handleSortByWatchers={this.handleSortByWatchers}
                  />
                  <Listing data={data} />
                </>
              }
            </div>
          </div>
        </div>
        {
          (call && call.resources) &&
          <Footer call={call} />
        }
      </div>
    );
  }
}

// App.propTypes = {
//   fetchedData: PropTypes.object.isRequired,
//   error: PropTypes.object.isRequired
// };

render(<App />, document.querySelector("#root"));
