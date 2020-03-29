import React from 'react'

const MoreButton = (props) =>
  <>
    {
      props.moreButton &&
      <button
        className="btn btn-default btn-dark"
        onClick={props.handleMore}
      >+ More
      </button>
    }
  </>

export default MoreButton