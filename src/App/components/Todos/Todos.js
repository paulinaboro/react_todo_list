import React from "react";
import TodoForm from "../TodoForm/TodoForm";

export default class Todos extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            todolist: [],
            newTask: "",
            id: "",
            task: "",
        }
    }
    async componentDidMount() {
        const baseLink = "http://localhost:8080/todos";
        const response = await fetch(baseLink);
        const todolist = await response.json();

        this.setState({ todolist: todolist });
      }

      // Receiving data from child component -> TodoForm through callback function
      onFormSubmit = (taskData) => {
        this.setState({
            todolist: [taskData, ...this.state.todolist]
            })
  }

  handleTodoDelete = async (idToDelete) => {
        const api = "http://localhost:8080/todos/" + idToDelete;

        let response = await fetch( api , {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
       },
       })       
       .then(response => response.json())

      this.setState({
          todolist: this.state.todolist.filter(item => item.id !== idToDelete)
        })
    }

        handleChange = (value, id) => {
        this.setState({ id: id, task: value });

        const taskUpdated = {
            id: id,
            task: value,
        }
        // Passing the task id in the link, later it will be retrived using params in API
        const api = "http://localhost:8080/todos/" + taskUpdated.id;
            fetch( api , {
              method: "PATCH",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(taskUpdated)
            })
              .then(response => response.json())
              }
    render(){ 
        return(
        <div>
            <h1>To do List:</h1>
            <TodoForm onFormSubmit={this.onFormSubmit}/>
            {this.state.todolist.map((todo) => {
    return(
    <div key={todo.id}>  
  <input name="task" defaultValue={todo.task} type="text" onChange={ (e) => this.handleChange(e.target.value, todo.id)}/>
    <button value={todo.id} onClick={() => this.handleTodoDelete(todo.id)}>
        <img alt="trash icon" src={require('../../images/trash-icon.png')} style={{width: 30}} />
        </button>
    </div>
    )
  })
}
        </div>
        );
    }
}