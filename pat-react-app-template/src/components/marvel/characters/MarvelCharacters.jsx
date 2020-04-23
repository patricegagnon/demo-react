import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import MarvelService, {MarvelImageFormats, getImageUrl}  from '../../../services/MarvelProxyService'
import Pagination from '../../common/Pagination'

import {Selectors} from "../../../store/characters/selectors"
import {ActionCreators} from "../../../store/characters/actions"
import {Link} from 'react-router-dom'


class MarvelCharacters extends React.Component {
  constructor(props) {
    super(props)
    this.fetchPageData = this.fetchPageData.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
    this.renderCharacterTile = this.renderCharacterTile.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)

  }
  componentDidMount () {
    this.fetchPageData(this.props.offset, this.props.limit)
  }
  handlePrevious(event) {
    event.preventDefault()
    this.fetchPageData(this.props.offset - this.props.limit, this.props.limit)
  }

  handleNext(event) {
    event.preventDefault()
    this.fetchPageData(this.props.offset + this.props.limit, this.props.limit)
  }

  handleChangePage(pageNumber) {
    this.fetchPageData((pageNumber - 1) * this.props.limit, this.props.limit)
  }
  fetchPageData(offset, limit) {
    this.props.actions.fetchCharacters(offset, limit)
  }

  renderCharacterTile (character) {
    return <div key={`character${character.name}`} className="card m-2" style={{width: '300px'}}>
      <img src={getImageUrl(character.thumbnail, MarvelImageFormats.landscape_large)} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title"><Link to={`${this.props.match.url}/${character.id}`}>{character.name}</Link></h5>
      </div>
    </div>
  }
  renderPagination() {
    return <Pagination
      offset={this.props.offset}
      limit={this.props.limit}
      total={this.props.total}
      handlePrevious={this.handlePrevious}
      handleNext={this.handleNext}
      handleChangePage={this.handleChangePage}
      isFetching={this.props.isFetching}
    />
  }

  render () {
    return <div>
      <h1>Liste des personnages</h1>
      {this.renderPagination()}
      <div className="d-flex flex-wrap">
        {this.props.characters.map(character => {
          return this.renderCharacterTile(character)
        })}
      </div>
      {this.renderPagination()}
    </div>
  }
}


const mapStateToProps = state => {
  return {
    characters: Selectors.getCharacters(state),
    offset: Selectors.getOffset(state),
    limit: Selectors.getLimit(state),
    total: Selectors.getTotal(state),
    isFetching: Selectors.isFetching(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}

const MarvelCharactersConnected = connect(mapStateToProps, mapDispatchToProps)(MarvelCharacters)

export default MarvelCharactersConnected
