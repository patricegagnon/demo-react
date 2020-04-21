import React from 'react'
import MarvelService, {MarvelImageFormats, getImageUrl} from '../../../../services/MarvelProxyService'
import {Selectors} from "../../../../store/characters/selectors";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../../../store/characters/actions";
import {connect} from "react-redux";

class MarvelCharacterDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {character: null}
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.actions.setCharacter(null)
    this.props.actions.fetchCharacter(id)
  }

  render() {
    const {character} = this.props
    if (!character) {
      return <div></div>
    }
    return <div>
      <h1>{character.name}</h1>
      {character.thumbnail && <img src={getImageUrl(character.thumbnail, MarvelImageFormats.landscape_incredible)}/>}
      {character.description && <p>{character.description}</p>}

    </div>
  }
}

const mapStateToProps = state => {
  return {
    character: Selectors.getCharacter(state),
    isFetching: Selectors.isFetching(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}

const MarvelCharacterDetailConnected = connect(mapStateToProps, mapDispatchToProps)(MarvelCharacterDetail)


export default MarvelCharacterDetailConnected