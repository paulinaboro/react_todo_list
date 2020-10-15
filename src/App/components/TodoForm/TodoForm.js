import React from "react";
import shortid from "shortid";

export default class TodoForm extends React.Component{
    constructor() {
        super();
        this.state = {
          task: "",
        };
      }

    onSubmit = async (event) => {
        event.preventDefault();
        let newItem = { 
            id: shortid.generate(),
            task: this.state.task
             }

        if( newItem.task.length === 0 ){
            alert("You didn't add any task");
        } else {
            const api = "http://localhost:8080/todos/add";
            let response = await
            fetch( api , {
            method: "POST",
            headers: { "Content-Type": "application/json",
           },
            body: JSON.stringify(newItem)
           }).then(response => response.json())
          
               //Passing new task data to the parent component -> Todos using callback function passed in the props
                this.props.onFormSubmit(newItem);

                //Clearing input field after form submit
                this.setState({ task: ""});
          }
        }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }
    render(){
        return(
            <div>
<form onSubmit={this.onSubmit}>
  <ul>
    <li>
  <input placeholder="New Todo" name="task" value={this.state.task} type="text" onChange={this.onChange}/>
    </li>
    <li>
  <button type="submit" value="Submit">
  <img alt="plus icon" src={require('../../images/plus-icon.png')} style={{width: 40}} />
  </button>
    </li>
  </ul>
</form>
            </div>
        )
    }
}