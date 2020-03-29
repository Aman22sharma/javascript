import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  PocketShareButton,
  InstapaperShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  LivejournalIcon,
  MailruIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  EmailIcon
} from 'react-share'
import './App.css'

const Button = props =>
  <button className='main__button' onClick={props.handleClick} disabled={props.disabled && 'disabled'}>
    <span className='fa'></span>
  </button>
const Content = props =>
  <div className="main__advice">
    <p className='main__advice-paragraph'>
      <span className="main__advice-span">{props.advice.slip.advice}</span>
      <div className="main__social">
        <FacebookShareButton quote={props.advice.slip.advice} url={props.url}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton title={props.advice.slip.advice} url={props.url}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <TwitterShareButton title={props.advice.slip.advice} url={props.url}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <TelegramShareButton title={props.advice.slip.advice} url={props.url}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <WhatsappShareButton title={props.advice.slip.advice} url={props.url}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <VKShareButton title={props.advice.slip.advice} url={props.url}>
          <VKIcon size={32} round={true} />
        </VKShareButton>
        <OKShareButton title={props.advice.slip.advice} url={props.url}>
          <OKIcon size={32} round={true} />
        </OKShareButton>
        <RedditShareButton title={props.advice.slip.advice} url={props.url}>
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
        <TumblrShareButton title={props.advice.slip.advice} url={props.url}>
          <TumblrIcon size={32} round={true} />
        </TumblrShareButton>
        <LivejournalShareButton title={props.advice.slip.advice} url={props.url}>
          <LivejournalIcon size={32} round={true} />
        </LivejournalShareButton>
        <MailruShareButton title={props.advice.slip.advice} url={props.url}>
          <MailruIcon size={32} round={true} />
        </MailruShareButton>
        <ViberShareButton title={props.advice.slip.advice} url={props.url}>
          <ViberIcon size={32} round={true} />
        </ViberShareButton>
        <WorkplaceShareButton quote={props.advice.slip.advice} url={props.url}>
          <WorkplaceIcon size={32} round={true} />
        </WorkplaceShareButton>
        <LineShareButton title={props.advice.slip.advice} url={props.url}>
          <LineIcon size={32} round={true} />
        </LineShareButton>
        <PocketShareButton title={props.advice.slip.advice} url={props.url}>
          <PocketIcon size={32} round={true} />
        </PocketShareButton>
        <InstapaperShareButton title={props.advice.slip.advice} url={props.url}>
          <InstapaperIcon size={32} round={true} />
        </InstapaperShareButton>
        <EmailShareButton subject={props.advice.slip.advice} url={props.url}>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </div>
    </p>
  </div>
const Error = () =>
  <div className="main__advice">
    <p className='main__advice-text'>Sorry, something went wrong!</p>
  </div>
const Loading = () =>
  <div className="main__advice">
    <p className='main__advice-text'><img src='loading.svg' alt='Loading' /></p>
  </div>

class App extends Component {
  state = {
    advice: [],
    error: null,
    isLoading: true,
    url: 'https://tinyurl.com/gyaan-corner'
  }
  handleAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(advice => this.setState({ advice, isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }))
  }
  handleClick = event => {
    this.setState({ isLoading: true })
    this.handleAdvice()
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    this.handleAdvice()
  }
  render() {
    const {advice, error, url, isLoading} = this.state
    return (
      <>
        <main className='main'>
          {
            error
            ? <Error />
            : isLoading
            ? <Loading />
            : <>
              <Content advice={advice} url={url} />
              <Button
                handleClick={this.handleClick}
                disabled={isLoading}
              />
            </>
          }
        </main>
      </>
    )
  }
}

Button.propTypes = {
  handleClick: PropTypes.func,
  disabled: PropTypes.bool
}

Content.propTypes = {
  advice: PropTypes.object
}

export default App