import React, { Component } from 'react';
import './App.css';
import Loading from './Loading/Loading';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

const key = 'AIzaSyD5JQeXs-wkxUINtZMgUwmQvvhZqv4zu0Q';
const fccId = 'PLWKjhJtqVAbnupwRFOq9zGOWjdvPRtCmO';
const playlistId = fccId;
let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=50`;

class App extends Component {
  state = {
    data: [],
    videos: [],
    nextPageToken: null,
    error: null,
    loading: false
  }
  componentDidMount() {
    this.setState({ loading: true });
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ data, videos: data.items, loading: false, nextPageToken: data.nextPageToken }))
    .catch(error => this.setState({ error }));
  }
  handleMore = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { nextPageToken } = this.state;
    url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=50&pageToken=${nextPageToken}`;
    fetch(url)
    .then(response => response.json())
    .then(newCourses => this.setState(previousState => {
        return {
          data: newCourses,
          videos: [...previousState.videos, ...newCourses.items],
          loading: false,
          nextPageToken: newCourses.nextPageToken
        }
      }
    ))
    .catch(error => this.setState({ error }));
  }
  render() {
    const {data, error, nextPageToken, loading, videos} = this.state;
    return (
      <>
        {
          error ?
          <>
            <Header />
            <ErrorMessage />
            <Footer />
          </> :
          <>
            {
              loading ?
              <>
                <Header />
                <Loading />
                <Footer />
              </> :
              <>
                <Header pageInfo={data.pageInfo} totalVideosLoaded={videos && videos.length} />
                <Main videos={videos} handleMore={this.handleMore} nextPageToken={nextPageToken} />
                <Footer />
              </>
            }
          </>
        }
      </>
    );
  }
}

export default App;