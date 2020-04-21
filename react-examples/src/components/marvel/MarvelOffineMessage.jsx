import React from 'react'
import {connect} from "react-redux"
import {Selectors} from '../../store/app/selectors'

class MarvelOfflineMessage extends React.Component {
  render () {
    const {marvelServiceStatus} = this.props
    return <div className={`offline-message ${marvelServiceStatus}`}>Mode déconnecté</div>

  }
}

const mapStateToProps = state => {
  return {
    marvelServiceStatus: Selectors.getMarvelServiceStatus(state)
  }
}

const MarvelOfflineMessageConnected = connect(mapStateToProps)(MarvelOfflineMessage)

export default MarvelOfflineMessageConnected