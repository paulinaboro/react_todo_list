import React from "react";
import Todos from "../Todos/Todos";
import Form from "../Form/Form";

export default class Container extends React.Component{
  constructor() {
    super();
    this.state = {
     newTask: "",
    }
}
onFormSubmit = (taskData) => {
      this.setState({newTask: taskData})
}
    render(){ 
      return(
        <div 
        >
          <Todos 
        addNewTask={this.addNewTask} onFormSubmit={this.onFormSubmit}
          />
          <Form onFormSubmit ={this.onFormSubmit}/>
        </div>
      );
    }
      }