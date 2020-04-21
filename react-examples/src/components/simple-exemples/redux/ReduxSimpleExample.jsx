import React from 'react'
import {createStore} from 'redux'

let devToolsExtension = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
  ? window.__REDUX_DEVTOOLS_EXTENSION__({
    actionsBlacklist: ['@@redux-form/REGISTER_FIELD']
  }) : (f) => f

const initialState = {
  clicks: 0
}

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case 'CLICK':
      const newState = {...state}
      newState.clicks++
      return newState
    default:
      return state
  }
}

const store = createStore(reducer, initialState, devToolsExtension)

class ReduxSimpleExample extends React.Component {
  constructor(props) {
    super(props)
    this.onStoreChange = this.onStoreChange.bind(this)
    store.subscribe(this.onStoreChange)
  }
  onStoreChange() {
    const state = store.getState()
    console.log('Nouveau click. Total : ' + state.clicks)
  }
  augmenterLeNombreDeClick() {
    store.dispatch({type: 'CLICK'})
  }
  render () {
    return <div>
      <h1>Redux example</h1>

      <button onClick={this.augmenterLeNombreDeClick}>Click</button>
    </div>
  }
}

export default ReduxSimpleExample
