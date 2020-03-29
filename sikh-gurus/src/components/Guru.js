import React, { Component, Fragment } from 'react'

class Guru extends Component {
  render() {
    const { name, dob, doe, doc, timeline, age, father, mother, thumbnail, reference } = this.props.data
    return (
      <Fragment>
        <article className="guru">
          <img className='guru__thumbnail' src={ thumbnail } alt={ 'Picture of ' + name } />
          <h2 className='guru__name'>{ name }</h2>
          { dob && <p className='guru__dob'><span>Date of Birth:</span> { dob }</p> }
          { doe && <p className='guru__doe'><span>Date of Death:</span> { doe }</p> }
          { doc && <p className='guru__doc'><span>Date of Guru-ship:</span> { doc }</p> }
          { timeline && <p className='guru__timeline'><span>Timeline:</span> { timeline }</p> }
          { age && <p className='guru__age'><span>Age:</span> { age }</p> }
          { father && <p className='guru__father'><span>Father's Name:</span> { father }</p> }
          { mother && <p className='guru__mother'><span>Mother's Name:</span> { mother }</p> }
          <a className='guru__link' href={ reference } target='_blank' rel='noopener noreferrer'>Read more <i className='fa fa-external-link'></i></a>
        </article>
      </Fragment>
    )
  }
}

export default Guru