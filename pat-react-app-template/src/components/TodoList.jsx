import React from "react";
import MarvelProxyService from "../services/MarvelProxyService";
import Title from './common/Title'
const svc = new MarvelProxyService()

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.todoToAdd = React.createRef();
    this.state = {todos:[]}
  }
  componentDidMount() {
    svc.getTodos().then(todos => {
      this.setState({todos: todos})
    })
  }
  addTodo () {
    const {todos} = this.state
    const newTodos = [...todos, this.todoToAdd.current.value]
    svc.updateTodos(newTodos)
    this.setState({todos: newTodos})
  }
  render () {
    return <div style={{width: '300px'}}>
      <Title>À faire</Title>
      <ul>
        {this.state.todos.map(todo => <li>{todo}</li>)}
      </ul>
      <input ref={this.todoToAdd}/><button  className=" btn btn-primary mb-1" onClick={this.addTodo}>Ajouter</button>
    </div>
  }
}

export default TodoList