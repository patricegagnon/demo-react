import React from 'react';
import StyledButton from "../common/StyledButton";

import {NavLink, Route, Switch} from 'react-router-dom';

const Contacts = ({match}) => {
  return <div>
    <h2>Contactez-nous</h2>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to={`${match.url}/address`}>Adresse</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to={`${match.url}/form`}>Formulaire</NavLink>
      </li>
    </ul>
    <Switch>
      <Route path={`${match.url}/address`} component={Address}/>
      <Route path={`${match.url}/form`} component={Form}/>
    </Switch>
  </div>
}

const Address = () => {
  return <div className="p-3">
    <h2>Adresse</h2>
    <h4>Québec</h4>
    725, boulevard Lebourgneuf, bureau 525
    <br/><br/>
    Québec (Québec) G2J 0C4
    <br/><br/>
    Tél. : 418 650-2866
  </div>
}

const Form = () => {
  return <div className="p-3">
    <h2>Formulaire de contact</h2>
    <div className="form">
      <label>Nom</label>
      <input name="name"/>
      <label>Message</label>
      <textarea />
      <br/>
      <StyledButton buttonText="Envoyer" icon="icon-rocket" />
    </div>
  </div>
}

export default Contacts