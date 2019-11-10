import React from 'react'
import MarvelService, {getInstance, MarvelImageFormats, getImageUrl} from '../../../services/MarvelProxyService'

class MarvelCharacterDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {character: null}
    this.marvelService = getInstance()
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.setState({isFetching: true})
    this.marvelService.getCharacter(id).then((response) => {
      this.setState({character: response})
    }).catch(error => {
      console.error('MarvelCharacterDetail error: ' + error)
    }).finally(() => {
      this.setState({isFetching: false})
    })
  }

  render() {
    const {character} = this.state
    if (!character) {
      return <div></div>
    }
    return <div>
      <h1>{character.name}</h1>
      <img src={getImageUrl(character.thumbnail, MarvelImageFormats.landscape_incredible)}/>
      {character.description && <p>{character.description}</p>}

    </div>
  }
}


export default MarvelCharacterDetail