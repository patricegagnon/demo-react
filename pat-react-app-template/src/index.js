import React from 'react'
import ReactDOM from 'react-dom'
import {NavLink, Route, Switch, BrowserRouter} from 'react-router-dom';

import BaseExample from './components/BaseExample'
import TodoList from './components/common/TodoList'
import withBorders from './components/common/WithBorders'
import MarvelSection from './components/marvel/MarvelSection'
import {Provider} from 'react-redux'
import initStore from './store/store'

const store = initStore()

const TodoWithBorders = withBorders(TodoList)

const Home = () => {
  return <h1>Formation React!!</h1>
}
const SiteLayout = () => {
  return <div>
    <BrowserRouter>
      <div className="header">
        <h1>Mon premier site React</h1>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink exact className="nav-item nav-link" activeClassName="active" to="/">Accueil</NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/base-example">Exemple</NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/todos">Todos</NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/marvel">Marvel</NavLink>
            </div>
          </div>
        </nav>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/base-example" render={(props) => <BaseExample titre="Bonjour" contenu="Ceci est mon premier site avec React en props"/>} />
        <Route path="/todos" component={TodoWithBorders} />
        <Route path="/marvel" component={MarvelSection} />
      </Switch>
    </BrowserRouter>
  </div>

}

ReactDOM.render(
  <Provider store={store}>
    <SiteLayout />
  </Provider>,
  document.getElementById('root'))

