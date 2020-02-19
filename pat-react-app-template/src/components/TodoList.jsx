import React from 'react'
import {CssClassNames} from "./const";

class TodoList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.inputRef = React.createRef()
    this.state = {list: []}
  }
  addTodo () {
    const todo = this.inputRef.current.value
    this.inputRef.current.value = ''
    this.setState({list: [...this.state.list, todo]})
  }
  deleteTodo (e) {
    const index = parseInt(e.target.dataset.index)
    const newList = [...this.state.list]
    newList.splice(index, 1)
    this.setState({list: newList})
  }
  render () {
    return <div>
      <h1>Todos</h1>
      <ul>
        {this.state.list.map((item,index) => {
          return <li>{item} <button className={CssClassNames.closeTodoButton} data-index={index} onClick={this.deleteTodo}>x</button></li>
        })}
      </ul>
      <input ref={this.inputRef}/> <button className={CssClassNames.button} onClick={this.addTodo}>Ajouter</button>
    </div>
  }
}

export default TodoList
