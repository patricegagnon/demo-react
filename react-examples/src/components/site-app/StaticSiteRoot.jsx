import React from 'react';

import {Link, Route, Switch} from 'react-router-dom';

const Home = () => {
  return <div>
    <h2>Accueil</h2>
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

const Contacts = () => {
  return <div>
    <h2>Contactez-nous</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut tellus ut lacus pretium vulputate. Nam
      consectetur vehicula neque, eu vulputate tellus rhoncus eget. Vestibulum pretium maximus lobortis. Morbi
      imperdiet, felis quis placerat efficitur, libero massa commodo nisi, id efficitur lectus urna eu ex. Praesent
      blandit consectetur nunc, sed tempor diam. Integer sagittis velit dolor, quis faucibus augue aliquam hendrerit.
      Proin erat elit, efficitur in finibus sed, feugiat ac libero. Proin nunc massa, varius sit amet dapibus at,
      gravida eget ligula. Duis facilisis justo turpis, id blandit ante vestibulum sit amet. Nunc imperdiet convallis
      diam. Cras ut tempus nisi.</p>
  </div>
}

export default () => {
  return <div>
    <h1>Mon nouveau site</h1>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/">Accueil</Link>
          <Link className="nav-item nav-link" to="/about">À propos</Link>
          <Link className="nav-item nav-link" to="/contacts">Contactez-nous</Link>
        </div>
    </nav>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/contacts" component={Contacts}/>
    </Switch>
  </div>
}