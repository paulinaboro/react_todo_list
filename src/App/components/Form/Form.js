import React from "react";

export default class Form extends React.Component{
  constructor() {
    super();
    this.state = {
      id: "",
      task: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    let newItem = { id: this.state.id, task: this.state.task }
    const api = "http://localhost:8080/todos/add";

    let response = await fetch( api , {
    method: "POST",
    headers: { "Content-Type": "application/json",
   },
    body: JSON.stringify(newItem)
   });
        let newTasks = await response.json();
        // console.log(newTasks);
        // this.setState({ todolist: newTasks})
        // pass in the function - data to the props in the form component to the parent element
//.than => 
       //passing new Task data to the parent component on the callback function
        this.props.onFormSubmit(newItem);
  
  }
   

  handleInputChanged = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };  

    render(){
      const { id, task } = this.state;
        return(
            <div>
<form onSubmit={this.onSubmit}>
  <input name="id" value={id} type="text" onChange={this.onChange}/>
  <input name="task" value={task} type="text" onChange={this.onChange}/>
  <input type="submit" />
</form>
            </div>
        );
    }
}