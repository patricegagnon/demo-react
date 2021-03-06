import React from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {find} from 'lodash'
let devToolsExtension = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
  ? window.__REDUX_DEVTOOLS_EXTENSION__({
    actionsBlacklist: ['@@redux-form/REGISTER_FIELD']
  }) : (f) => f

const initialState = {
  items: [
    {id:1, image:'1-arc.png'},
    {id:2, image:'2-bomerang.png'},
    {id:3, image:'3-bombe.png'},
    {id:4, image:'4-grapin.png'},
    {id:5, image:'5-sac.png'},
    {id:6, image:'6-baton.png'},
    {id:7, image:'7-baton-bleu.png'},
    {id:8, image:'8-tag-1.png'},
    {id:9, image:'9-tag-2.png'},
    {id:10, image:'10-tag-3.png'},
    {id:11, image:'11-lampe.png'},
    {id:12, image:'12-marteau.png'},
    {id:13, image:'13-ocarina.png'},
    {id:14, image:'14-filet.png'},
    {id:15, image:'15-livre.png'},
    {id:16, image:'16-potion.png'},
    {id:17, image:'17-canne-rouge.png'},
    {id:18, image:'18-canne-bleu.png'},
    {id:19, image:'19-cape.png'},
    {id:20, image:'20-mirroir.png'}

  ],
  selectedItemId: 20
}

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case 'SELECT_ITEM':
      const newState = {...state}
      newState.selectedItemId = action.id
      return newState
    default:
      return state
  }
}

const store = createStore(reducer, initialState, devToolsExtension)

class ZeldaItemSelector extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onStoreChange = this.onStoreChange.bind(this)

    const selectedItemId = store.getState().selectedItemId
    this.state = {
      selectedItemId: selectedItemId
    }
    store.subscribe(this.onStoreChange)
  }
  onStoreChange() {
    const state = store.getState()
    const selectedItemId = state.selectedItemId
    this.setState({
      selectedItemId: selectedItemId
    })
  }
  render () {
    const {selectedItemId} = this.state
    const items = store.getState().items
    const selectedItem = selectedItemId ? find(items, {id: selectedItemId}) : null
    return <div>
      <h1>Zelda items selector 1</h1>
      <div className="zeldaItemSelector">
        <div className="zeldaItems">
          {items.map(item => {
            return <ZeldaItem item={item}/>
          })}
        </div>
        <ZeldaSelectedItem item={selectedItem} />
      </div>
    </div>
  }

}

const ZeldaSelectedItem = ({item}) => {
  const style={backgroundImage: `url(/public/images/zelda/${item.image})`}
  return <div className="zeldaItem zeldaSelectedItem" style={style}></div>
}

class ZeldaItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.selectItem = this.selectItem.bind(this)
  }
  selectItem () {
    store.dispatch({type: 'SELECT_ITEM', id: this.props.item.id})
  }
  render () {
    const style={backgroundImage: `url(/public/images/zelda/${this.props.item.image})`}
    return <div className="zeldaItem" style={style} onClick={this.selectItem}></div>
  }

}
export default ZeldaItemSelector