import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SiteRoot from './components/site-app/StaticSiteRoot'
import MarvelSiteRoot from './components/site-app/MarvelSiteRoot'
import createStore from './store/store'
import { Provider } from 'react-redux'


const store = createStore()
store.name = 'site-app-store'
export const mountMarvelSite = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <MarvelSiteRoot/>
      </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
}


export const mountStaticSite = () => {
  ReactDOM.render(
      <BrowserRouter>
        <SiteRoot/>
      </BrowserRouter>
    , document.getElementById('root'));
}
