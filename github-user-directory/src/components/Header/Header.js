import React from 'react'

const Header = (props) =>
  <h5 className="m-0 p-0 text-center">
    <label className="m-0 p-0 font-weight-bold" htmlFor="findDeveloper">
      <span role="img" aria-label="Lit" className="mr-1">🔥</span>
        {props.title}
      <span role="img" aria-label="Lit" className="ml-1">🔥</span>
    </label>
  </h5>

export default Header