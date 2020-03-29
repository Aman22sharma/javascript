import React, { Component } from 'react'
import Moment from 'react-moment'
import './App.css'

const Loading = props => <><div className='page'><img src='./loading.svg' alt='Loading...' /></div></>

const Error = props => <><div className='page'><img src='./error.gif' alt='Something went wrong, please try again...' /></div></>

class NewsItem extends Component {
  render() {
    return (
      <>
        <div className='news__item'>
          {
            this.props.newsItem.urlToImage && <a className='news__link' href={this.props.newsItem.url} target='_blank' rel='noopener noreferrer'><img className='news__thumb' src={this.props.newsItem.urlToImage} alt={this.props.newsItem.title} /></a>
          }
          {
            this.props.newsItem.title && <a className='news__title-link' href={this.props.newsItem.url} target='_blank' rel='noopener noreferrer'><h2 className='news__title'>{this.props.newsItem.title}</h2></a>
          }
          {
            this.props.newsItem.description && <p className='news__content'>{this.props.newsItem.description}</p>
          }
          {
            this.props.newsItem.author && <p className='news__author'><strong>Author:</strong> {this.props.newsItem.author}</p>
          }
          {
            this.props.newsItem.source.name && <p className='news__source'><strong>Source:</strong> {this.props.newsItem.source.name}</p>
          }
          {
            this.props.newsItem.publishedAt && <p className='news__date'><strong>Published:</strong> <Moment date={this.props.newsItem.publishedAt} format='lll' /></p>
          }
        </div>
      </>
    )
  }
}

class News extends Component {
  render() {
    return (
      <>
        <div className='news'>
          {this.props.news.articles && this.props.news.articles.map(news => <NewsItem newsItem={news} key={news.title} />)}
        </div>
      </>
    )
  }
}

class Weather extends Component {
  render() {
    return (
      <>
        <div className='weather' style={{ backgroundImage: 'url(' + this.props.picture.results[0].urls.regular + ')' }}>
          <div className="weather__items">
            <h1>{this.props.weather.name}</h1>
            <h2><strong>Temp:</strong> {Math.floor(this.props.weather.main.temp)}&deg;C</h2>
            <h3><strong>Weather:</strong> {this.props.weather.weather[0].description}</h3>
            <p><strong>Type:</strong> {this.props.weather.weather[0].main}</p>
            <p><strong>Max:</strong> {Math.floor(this.props.weather.main.temp_max)}&deg;C</p>
            <p><strong>Min:</strong> {Math.floor(this.props.weather.main.temp_min)}&deg;C</p>
            <p><strong>Sunrise:</strong> <Moment date={this.props.weather.sys.sunrise} format='LTS' unix /></p>
            <p><strong>Sunset:</strong> <Moment date={this.props.weather.sys.sunset} format='LTS' unix /></p>
          </div>
          <button className='load' onClick={event => this.props.getMoreNews(event)}>View more news</button>
        </div>
      </>
    )
  }
}

class App extends Component {
  state = {
    page: 1,
    picture: [],
    news: {},
    location: null,
    weather: {},
    error: null,
    loading: true
  }
  async componentDidMount() {
    await fetch('https://api.ipdata.co/?api-key=test')
    .then(response => response.json())
    .then(location => {
      this.setState({ location: location.city })
      this.getAlert(location.city)
      this.getNews(location.city)
      return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location.city}&appid=1c3e0e6201b40d640218e856c46d4323&units=metric`)
    })
    .then(response => response.json())
    .then(weather => this.setState({
      weather,
      loading: false
    }))
    .catch(error => this.setState({ error }))
  }
  getAlert = async (location) => {
    await fetch(`https://api.unsplash.com/search/photos?client_id=5ce3f2c175e54023196b94308388ddbc965fcd9d831d9a39b2118d593c7845f0&page=1&query=${location}&per_page=1`)
    .then(response => response.json())
    .then(data => this.setState({
      picture: data
    }))
    .catch(error => this.setState({ error }))
  }
  getNews = async (location) => {
    const {page} = this.state
    await fetch(`https://newsapi.org/v2/everything?q=${location}&pageSize=4&page=${page}&sortBy=publishedAt&apiKey=63f86003bea64ef3bae5fca878aeb719`)
    .then(response => response.json())
    .then(data => this.setState(previousState => ({
      news: { ...previousState.news, ...data }
    })))
    .catch(error => this.setState({ error }))
  }
  getMoreNews = (event) => {
    event.preventDefault()
    const {location} = this.state
    this.setState(previousState => ({
      page: previousState.page + 1
    }), () => this.getNews(location))
  }
  render() {
    const { weather, loading, error, picture, news } = this.state
    return <>
      {
        error || weather.hasOwnProperty('message')
        ? <Error />
        : loading
        ? <Loading />
        : <><Weather weather={weather} picture={picture} getMoreNews={this.getMoreNews} /><News news={news} /></>
      }
    </>
  }
}

export default App
