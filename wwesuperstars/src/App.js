import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <section>
        <Header content="WWE Superstars" />
        <MainContent />
        <Footer content="&copy; All rights reserved." />
        <audio src="music.mp3" autoplay loop>
          <embed src="music.mp3" loop="true" autostart="true" hidden="true" />
        </audio>
      </section>
    );
  }
}

export default App;