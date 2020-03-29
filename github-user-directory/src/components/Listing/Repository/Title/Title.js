import React from 'react'
import './Title.css'

const Title = (props) =>
  <div className="d-flex w-100 justify-content-between">
    <a
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h5 className="mb-1 repository-title font-weight-bold text-primary">{props.title}</h5>
    </a>
    <small>
      <em className="text-danger font-weight-bold">
        {new Date(props.date).toLocaleDateString(
          "en-CA"
        )}
      </em>
    </small>
  </div>

export default Title