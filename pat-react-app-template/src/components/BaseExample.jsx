import React from 'react'
import {set} from 'lodash'
import ReactDOM from 'react-dom'
import StyledButton from './common/StyledButton'
import Titre from './common/Titre'


class BaseExample extends React.Component {
  constructor(props) {
    super(props)
    this.augmenter = this.augmenter.bind(this)
    this.state = {
      compteur: 0
    }
  }
  augmenter () {
    this.setState({compteur: this.state.compteur + 1})
  }
  render () {
    return <div>
      <Titre>{this.props.titre}</Titre>
      <MainContentLayout>{this.props.contenu}</MainContentLayout>
      <Compteur valeur={this.state.compteur} />
      <StyledButton buttonText={this.state.compteur} actionOnClick={this.augmenter}/>
    </div>
  }
}

const Compteur = ({valeur}) => {
  return <p>Compteur ==> {valeur}</p>
}



const MainContentLayout = ({children}) => {
  return <p className="shadow-lg p-3 mb-5 bg-white rounded">{children}</p>
}

export default BaseExample
