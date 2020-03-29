import React, {Fragment, Component} from 'react'
import Video from './Video'

class Videos extends Component {
  render(props) {
    const allVideos = (this.props.videos === undefined || this.props.videos.length === 0) ? '' : this.props.videos.items.map(item => {
      if(typeof item.id.videoId === 'undefined') {
        return false
      }
      return <Video key={item.id.videoId} content={item} video={item.id.videoId} autoplay='0' rel='0' modest='1' />
    })
    return (
      <Fragment>
        {allVideos}
      </Fragment>
    )
  }
}

export default Videos