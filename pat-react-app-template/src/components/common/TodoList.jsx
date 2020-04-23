import React from 'react'
import Titre from './Titre'
import StyledButton from './StyledButton'


class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.state = {
      todos: []
    }
  }

  addTodo() {
    const toAdd = document.getElementById('addTodoContent').value
    if (toAdd && toAdd.length > 0) {
      const newTodos = [...this.state.todos, toAdd]
      this.setState({todos: newTodos})
    }
  }

  removeTodo(index) {
    const newTodos = [...this.state.todos]
    newTodos.splice(index, 1)
    this.setState({todos: newTodos})
  }

  render() {
    return <div>
      <Titre>TODOS</Titre>
      <ul className="list-group">
        {this.state.todos.map((todo, index) => {
          return <li className="list-group-item" key={'todo' + index}>
            {todo} <span className="badge badge-light"><a href="#" onClick={() => this.removeTodo(index)}>X</a></span>
          </li>
        })}
      </ul>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <input id="addTodoContent" className="form-control"/>
          </div>
          <div className="col">
            <StyledButton actionOnClick={this.addTodo} buttonText="Ajouter"/>
          </div>
        </div>
      </div>

    </div>
  }
}

export default TodoList

