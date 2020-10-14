import React from "react";

export default class Todos extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            todolist: [],
            newTask: this.props.newTask,
        }
    }
    async componentDidMount() {
        const baseLink = "http://localhost:8080/todos";
        const response = await fetch(baseLink);
        const todolist = await response.json(); //old

        this.setState({ todolist: todolist });

      }
    render(){ 
            
        return(
        <div>
            <h1>To do:</h1>
            {
 this.state.todolist.map((todo) => {
    return(
    <div key={todo.id}>{todo.task}</div>
    )
  })
}
<h1>task data is: {this.props.taskData}</h1>
        </div>
        );
    }
}