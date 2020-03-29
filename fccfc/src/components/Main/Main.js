import React, { Component } from 'react';
import './Main.css';
import Moment from 'react-moment';
import { sortBy } from 'lodash';

class Card extends Component {
  render() {
    const {video} = this.props;
    return (
      <>
        <section className="card">
          <header className="card__header">
            <h2 className="card__title">{video.snippet.title}</h2>
          </header>
          <main className="card__content">
            <img className="card__thumb" src={video.snippet.thumbnails.standard.url} alt={video.snippet.title} />
          </main>
          <footer className="card__footer">
            <p><strong>Uploaded:</strong> <Moment date={video.contentDetails.videoPublishedAt} format='LLLL' /></p>
            <a className='card__link' href={`https://www.youtube.com/watch?v=${video.contentDetails.videoId}`} target='_blank' rel='noopener noreferrer'>Watch Course</a>
          </footer>
        </section>
      </>
    );
  }
}

class App extends Component {
  render() {
    const { videos, nextPageToken } = this.props;
    let sortedItems = sortBy(videos, [video => {
      return video.contentDetails.videoPublishedAt
    }]).reverse();
    return (
      <>
        <main className="main">
          {
            sortedItems && sortedItems.map(video => <Card video={video} key={video.id} />)
          }
        </main>
        { nextPageToken && <button className='more' onClick={this.props.handleMore}>Load more courses</button> }
      </>
    );
  }
}

export default App;