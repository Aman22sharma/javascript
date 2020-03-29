import React from 'react'

const Footer = (props) =>
  <footer className="footer container mb-3">
    <div className="row">
      <div className="col col-12">
        <div className="alert alert-warning m-0 text-center" role="alert">
          This is an open source application. You can make <strong>{props.call.resources.core.limit}</strong> calls at times to Github API. You have made <strong>{props.call.resources.core.limit - props.call.resources.core.remaining}</strong> requests, you have <strong>{props.call.resources.core.remaining}</strong> calls left.
        </div>
      </div>
    </div>
  </footer>

export default Footer