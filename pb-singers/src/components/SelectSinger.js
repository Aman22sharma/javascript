import React, {Component, Fragment} from 'react'

class SelectSinger extends Component {
  render(props) {
    const singers = this.props.singers.map((singer, i) => <option key={i} value={singer}>{singer}</option>)
    return (
      <Fragment>
        <label>
          <span>
            <strong>Listen to:&nbsp;</strong>
          </span>
          <select
            name='yourSinger'
            value={this.props.yourSinger}
            onChange={this.props.handleChange}
          >
            <option value=''>Please select a Singer</option>
            {singers}
          </select>
        </label>
      </Fragment>
    )
  }
}

export default SelectSinger