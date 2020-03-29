import React, {Fragment, Component} from 'react'
import Data from './Data'
import SelectSinger from './SelectSinger'
import Loading from './Loading'
import axios from 'axios'
import Videos from './Videos'
import dotenv from 'dotenv'

dotenv.config()

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null,
      isLoading: true,
      yourSinger: '',
      videos: [],
      isVideoLoading: false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const updateData = [...new Set(Data)].sort()
    this.setState({
      data: updateData,
      isLoading: false
    })
  }
  async handleChange(event) {
    this.setState({
      isVideoLoading: true
    })
    const {name, value} = event.target
    const query = event.target.value.toLocaleLowerCase().replace(/ |-/g, '+')
    const API_KEY = process.env.REACT_APP_API_KEY
    const { data: videos } = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&maxResults=50&order=viewCount&q=${query}`)
    this.setState({
      [name]: value,
      videos,
      isVideoLoading: false
    })
  }
  render() {
    return (
      <Fragment>
        {
          this.state.isLoading &&
          <Loading />
        }
        {
          !this.state.isLoading &&
          <Fragment>
            <nav className='navigation'>
              <SelectSinger
                singers={this.state.data}
                handleChange={this.handleChange}
              />
            </nav>
            <main className='main'>
              <div className='placeholder'>
                <p>
                  {
                    this.state.yourSinger === '' &&
                    <span>Please select a singer you would like to watch videos of today? We will bring you Top 50 YouTube hits of your favorite singer. Get ready for some chill time!</span>
                  }
                  {
                    this.state.yourSinger !== '' &&
                    <span>Your selected artist is <strong>{this.state.yourSinger}</strong>.
                    </span>
                  }
                </p>
              </div>
              <section className='loadingVideos'>
                {
                  this.state.isVideoLoading &&
                  <p>Please hold tight as we are getting top 50 tracks for you...</p>
                }
              </section>
              <div className='videos'>
                <Videos videos={this.state.videos} />
              </div>
            </main>
            <footer className='footer'>
              <p className='love'>
                Made with <span className='heart' role='img' aria-label='Love...'>💓</span> by Tej Kahlon
              </p>
            </footer>
          </Fragment>
        }
      </Fragment>
    )
  }
}

export default App