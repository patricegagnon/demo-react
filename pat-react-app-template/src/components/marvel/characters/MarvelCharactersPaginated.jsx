import React from 'react'
import MarvelService, {MarvelImageFormats, getImageUrl} from '../../../services/MarvelProxyService'
import {Link} from "react-router-dom"
import Pagination from '../../common/Pagination'

import {CssClassNames} from '../../const'
class MarvelCharacters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      characters: [],
      offset: 0,
      limit: 20,
      total: 0,
      isFetching: false
    }
    this.marvelService = new MarvelService()
    this.renderCharacterTile = this.renderCharacterTile.bind(this)
    this.fetchPageData = this.fetchPageData.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  componentDidMount() {
    this.fetchPageData(this.state.offset, this.state.limit)
  }

  fetchPageData(offset, limit) {
    this.setState({isFetching: true})
    this.marvelService.getCharacters(offset, limit).then((response) => {
      this.setState({
        characters: response.results,
        offset: response.offset,
        limit: response.limit,
        total: response.total
      })
    }).catch(error => {
      console.error('MarvelCharacters error: ' + error)
    }).finally(() => {
      this.setState({isFetching: false})
    })
  }

  renderCharacterTile(character) {
    return <div key={`character${character.name}`} className={CssClassNames.tileContainer} style={{width: '300px'}}>
      <img src={getImageUrl(character.thumbnail, MarvelImageFormats.landscape_large)} className={CssClassNames.tileImage} />
      <div className={CssClassNames.tileBody}>
        <h5 className={CssClassNames.tileTitle}>{this.props.showDetailLink ?
          <Link to={`/characters/${character.id}`}>{character.name}</Link> : character.name}</h5>
      </div>
    </div>
  }

  handlePrevious(event) {
    event.preventDefault()
    this.fetchPageData(this.state.offset - this.state.limit, this.state.limit)
  }

  handleNext(event) {
    event.preventDefault()
    this.fetchPageData(this.state.offset + this.state.limit, this.state.limit)
  }

  handleChangePage(pageNumber) {
    this.fetchPageData((pageNumber - 1) * this.state.limit, this.state.limit)
  }

  renderPagination() {
    return <Pagination
      offset={this.state.offset}
      limit={this.state.limit}
      total={this.state.total}
      handlePrevious={this.handlePrevious}
      handleNext={this.handleNext}
      handleChangePage={this.handleChangePage}
      isFetching={this.state.isFetching}
    />
  }

  render() {
    return <div>
      <h1>Liste des personnages de Marvel</h1>
      {this.renderPagination()}
      <div className={CssClassNames.listContainer}>
        {this.state.characters.map(character => {
          return this.renderCharacterTile(character)
        })}
      </div>
      {this.renderPagination()}
    </div>
  }
}

export default MarvelCharacters