import React from 'react'
import MarvelService, {MarvelImageFormats, getImageUrl} from '../../../services/MarvelProxyService'
import {Link} from "react-router-dom"
import Pagination from '../../common/Pagination'

import {Selectors} from "../../../store/characters/selectors";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../../store/characters/actions";
import {connect} from "react-redux";
import {CssClassNames} from "../../const";

class MarvelCharacters extends React.Component {
  constructor(props) {
    super(props)
    this.marvelService = new MarvelService()
    this.renderCharacterTile = this.renderCharacterTile.bind(this)
    this.fetchPageData = this.fetchPageData.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  componentDidMount() {
    this.fetchPageData(this.props.offset, this.props.limit)
  }

  fetchPageData(offset, limit) {
    this.props.actions.fetchPageData(offset, limit)
  }

  renderCharacterTile(character) {
    return <div key={`character${character.name}`} className={CssClassNames.tileContainer} style={{width: '300px'}}>
      <img src={getImageUrl(character.thumbnail, MarvelImageFormats.landscape_large)}
           className={CssClassNames.tileImage}/>
      <div className={CssClassNames.tileBody}>
        <h5 className={CssClassNames.tileTitle}>{this.props.showDetailLink ?
          <Link to={`/characters/${character.id}`}>{character.name}</Link> : character.name}</h5>
      </div>
    </div>
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

  render() {
    return <div>
      <h1>Liste des personnages de Marvel</h1>
      {this.renderPagination()}
      <div className={CssClassNames.listContainer}>
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
