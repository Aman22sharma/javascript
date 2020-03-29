import React, {Component} from 'react'
import './WelcomeMessage.css';

class WelcomeMessage extends Component {
  render() {
    const {emoji} = this.props
    let propList = emoji;
    let tmpList = Object.keys(propList);
    let randomPropertyName = tmpList[ Math.floor(Math.random()*tmpList.length) ];
    let propertyValue = propList[randomPropertyName];
    return (
      <>
        <div className="alert alert-info m-0 text-center" role="alert">
          Welcome to git Developer Directory. Here, you can quickly look up a developer's information <em>(via their <strong>git</strong> username)</em>, recently updated repositories and related data available on Github platform, in a nice format.
        </div>
        <div className="mt-3 mb-0 p-3 emoji card d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img className="card-img-top mb-3" src={propertyValue} alt='Emoji of the day' />
            <div className="card-body m-0 p-0 text-center text-light">
              <h5 className="card-title m-0 p-0">Github API presents you emoji for the day via Emoji API.</h5>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default WelcomeMessage