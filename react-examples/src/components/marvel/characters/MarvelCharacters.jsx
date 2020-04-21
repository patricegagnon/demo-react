import React from 'react'
import MarvelService, {getInstance, MarvelImageFormats, getImageUrl}  from '../../../services/MarvelProxyService'

class MarvelCharacters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {characters: []}
    this.marvelService = getInstance()
    this.renderCharacterTile = this.renderCharacterTile.bind(this)
  }
  componentDidMount () {
    this.marvelService.getCharacters().then((response) => {
      this.setState({characters: response.results})
    })
      .catch(error => {
        console.error('MarvelCharacterDetail error: ' + error)
      })
  }
  renderCharacterTile (character) {
    return <div key={`character${character.name}`} className="card m-2" style={{width: '300px'}}>
      <img src={getImageUrl(character.thumbnail, MarvelImageFormats.landscape_large)} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
        </div>
    </div>
  }
  render() {
    return <div>
      <h1>Liste des personnages de Marvel</h1>
      <div className="d-flex flex-wrap">
        {this.state.characters.map(character => {
          return this.renderCharacterTile(character)
        })}
      </div>
    </div>
  }
}


export default MarvelCharacters