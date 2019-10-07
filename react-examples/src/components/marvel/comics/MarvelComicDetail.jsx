import React from 'react'
import MarvelService, {MarvelImageFormats, getImageUrl} from '../../../services/MarvelProxyService'
import {Selectors} from "../../../store/comics/selectors";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../../store/comics/actions";
import {connect} from "react-redux";

class MarvelComicDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.actions.fetchComic(id)
  }

  render() {
    const {comic} = this.props
    if (!comic) {
      return <div></div>
    }
    return <div>
      <h1>{comic.title}</h1>
      <img src={getImageUrl(comic.thumbnail, MarvelImageFormats.landscape_incredible)}/>
      {comic.description && <p>{comic.description}</p>}

    </div>
  }
}

const mapStateToProps = state => {
  return {
    comic: Selectors.getComic(state),
    isFetching: Selectors.isFetching(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}

const MarvelComicDetailConnected = connect(mapStateToProps, mapDispatchToProps)(MarvelComicDetail)

export default MarvelComicDetailConnected
