import React, {Fragment, Component} from 'react'

class Video extends Component {
  render(props) {
    let videoSrc = `https://www.youtube.com/embed/${this.props.video}?autoplay=${this.props.autoplay}&rel=${this.props.rel}&modestbranding=${this.props.modest}`
    return (
      <Fragment>
        <article className='video'>
          <iframe
            title={this.props.content.snippet.title}
            className='player'
            type='text/html'
            width='100%'
            height='100%'
            src={videoSrc}
            allowFullScreen
            frameBorder='0'
          />
        </article>
      </Fragment>
    )
  }
}

export default Video