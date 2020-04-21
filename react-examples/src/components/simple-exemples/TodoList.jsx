import React from 'react'
import {CssClassNames} from "../const";

class TodoList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.doneTodo  = this.doneTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.inputRef = React.createRef()
    this.state = {list: []}
  }

  doneTodo (e) {

    const index = parseInt(e.target.dataset.index)
    const self = this
    let newList = [...this.state.list]
    newList[index] = {...newList[index], status: 'DONE'}
    this.setState({list: newList})
  }
  addTodo () {
    const todo = this.inputRef.current.value
    this.inputRef.current.value = ''
    this.setState({list: [...this.state.list, {text: todo, status: 'TODO'}]})
  }
  deleteTodo (e) {
    const index = parseInt(e.target.dataset.index)
    const newList = [...this.state.list]
    newList.splice(index, 1)
    this.setState({list: newList})
  }
  render () {
    return <div style={{width: '500px'}}>
      <h1>Todos</h1>
      <ul className="list-group">
        {this.state.list.map((item,index) => {
          return <li className="list-group-item d-flex position-relative">
            <span style={{textDecoration: (item.status === 'DONE' ? 'line-through':'')}}>{item.text}</span>
            <button style={{top:'0', right:'0'}} className={`position-absolute ${CssClassNames.closeTodoButton}`} data-index={index} onClick={this.deleteTodo}>x</button>
            <button style={{top:'0', right:'20px'}} className={'position-absolute'} data-index={index} onClick={this.doneTodo}>-</button>
          </li>
        })}
      </ul>
      <input ref={this.inputRef}/> <button className={CssClassNames.button} onClick={this.addTodo}>Ajouter</button>
    </div>
  }
}

export default TodoList