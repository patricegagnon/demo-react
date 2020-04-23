import React from 'react'
import {set} from 'lodash'
import ReactDOM from 'react-dom'

const content = {
  title: 'Bonjour',
  description: 'Ceci est mon premier site avec Webpack'
}

class PageComponent extends React.Component {
  render () {
    return <div>
      <h1>Bonjour</h1>
      <p>Ceci est mon premier site avec Webpackwerwe</p>
    </div>
  }
}

const PageComponent2 = () => {
  return <div>
    <h1>Bonjour</h1>
    <p>Ceci est mon premier site avec Reactwerwer </p>
  </div>
}


ReactDOM.render(<PageComponent2 />, document.getElementById('root'))

