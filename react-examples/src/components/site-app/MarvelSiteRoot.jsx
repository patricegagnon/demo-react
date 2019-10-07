import React from 'react';

import {NavLink, Route, Switch} from 'react-router-dom';
import MarvelCharacters from "../marvel/characters/MarvelCharactersPaginated";
import MarvelCharacterDetail from '../marvel/characters/MarvelCharacterDetail'
import MarvelComics from "../marvel/comics/MarvelComics";
import MarvelComicDetail from '../marvel/comics/MarvelComicDetail'

import { withRouter } from 'react-router-dom'
import Contact from '../marvel/Contact'

const Home = () => {
  return <div>
    <h2>Accueil</h2>
    <img src="/public/images/home.jpg" />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut tellus ut lacus pretium vulputate. Nam
      consectetur vehicula neque, eu vulputate tellus rhoncus eget. Vestibulum pretium maximus lobortis. Morbi
      imperdiet, felis quis placerat efficitur, libero massa commodo nisi, id efficitur lectus urna eu ex. Praesent
      blandit consectetur nunc, sed tempor diam. Integer sagittis velit dolor, quis faucibus augue aliquam hendrerit.
      Proin erat elit, efficitur in finibus sed, feugiat ac libero. Proin nunc massa, varius sit amet dapibus at,
      gravida eget ligula. Duis facilisis justo turpis, id blandit ante vestibulum sit amet. Nunc imperdiet convallis
      diam. Cras ut tempus nisi.</p>
  </div>
}

const About = () => {
  return <div>
    <h2>À propos de ce site</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut tellus ut lacus pretium vulputate. Nam
      consectetur vehicula neque, eu vulputate tellus rhoncus eget. Vestibulum pretium maximus lobortis. Morbi
      imperdiet, felis quis placerat efficitur, libero massa commodo nisi, id efficitur lectus urna eu ex. Praesent
      blandit consectetur nunc, sed tempor diam. Integer sagittis velit dolor, quis faucibus augue aliquam hendrerit.
      Proin erat elit, efficitur in finibus sed, feugiat ac libero. Proin nunc massa, varius sit amet dapibus at,
      gravida eget ligula. Duis facilisis justo turpis, id blandit ante vestibulum sit amet. Nunc imperdiet convallis
      diam. Cras ut tempus nisi.</p>
  </div>
}




class MarvelSiteRoot extends React.PureComponent {
  constructor(props) {
    super(props)
    this.linkToContactUs = this.linkToContactUs.bind(this)
  }
  linkToContactUs (event) {
    event.preventDefault()
    this.props.history.push('/contact/address')
  }
  render() {
    return <div>
      <div className="header">
        <h1><img style={{height: '100px'}} src="/public/images/logo.svg" /></h1>
        <nav className="navbar navbar-expand-lg  navbar-light navbar-custom">
            <div className="navbar-nav">
              <NavLink exact className="nav-item nav-link" activeClassName="active" to="/">Accueil</NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/characters">Personnages</NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/comics">Bandes dessinées</NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/about">À propos</NavLink>
              <a className="nav-item nav-link" href="#" onClick={this.linkToContactUs}>Contactez-nous</a>
            </div>
        </nav>
      </div>
      <div className="p-3">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          <Route exact path="/characters" render={(props) => <MarvelCharacters {...props} showDetailLink />}/>
          <Route path="/characters/:id" component={MarvelCharacterDetail}/>
          <Route exact path="/comics" render={(props) => <MarvelComics {...props} showDetailLink />}/>
          <Route path="/comics/:id" component={MarvelComicDetail}/>
        </Switch>
      </div>
    </div>
  }
}

export default withRouter(MarvelSiteRoot)