import React, { Component, Fragment } from 'react'
import Guru from './Guru'
import Data from './Data'

class Gurus extends Component {
  render() {
    const gurus = Data.map(guru => <Guru key={guru.id} data={guru} />)
    return (
      <Fragment>
        <section className="gurus">
          {gurus}
        </section>
      </Fragment>
    )
  }
}

export default Gurus