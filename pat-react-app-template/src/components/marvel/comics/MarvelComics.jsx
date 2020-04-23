import React from "react";
import MarvelService, {getImageUrl, MarvelImageFormats} from "../../../services/MarvelProxyService";
import {Link} from "react-router-dom";
import Pagination from "../../common/Pagination";
import { connect } from 'react-redux'
import {Selectors} from '../../../store/comics/selectors'
import {ActionCreators} from '../../../store/comics/actions'
import {bindActionCreators} from 'redux'

class MarvelComics extends React.Component {
  constructor(props) {
    super(props)
    this.marvelService = new MarvelService()
    this.renderComicTile = this.renderComicTile.bind(this)
    this.fetchPageData = this.fetchPageData.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  componentDidMount() {
    this.fetchPageData(this.props.offset, this.props.limit)
  }

  fetchPageData(offset, limit) {
    this.props.actions.fetchComics(offset, limit)
  }

  renderComicTile(comic) {
    return <div key={`comic${comic.id}`} className="card m-2" style={{width: '300px'}}>
      <img src={getImageUrl(comic.thumbnail, MarvelImageFormats.landscape_large)} className="card-img-top"/>
      <div className="card-body">
        <h5 className="card-title"><Link to={`${this.props.match.url}/${comic.id}`}>{comic.title}</Link></h5>
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
      <h1>Liste des bandes dessinées de Marvel</h1>
      {this.renderPagination()}
      <div className="d-flex flex-wrap">
        {this.props.comics.map(comic => {
          return this.renderComicTile(comic)
        })}
      </div>
      {this.renderPagination()}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    comics: Selectors.getComics(state),
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

const MarvelComicsConnected = connect(mapStateToProps, mapDispatchToProps)(MarvelComics)

export default MarvelComicsConnected
