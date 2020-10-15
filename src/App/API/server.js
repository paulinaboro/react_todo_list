const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());

let todos = [];

app.get('/todos', (req, res, next) => {
  return  res.send(todos); 
});

app.post('/todos/add', (req, res) => {
let newTodo = {...req.body};
todos.push(newTodo);
return res.send(todos);
});

app.patch('/todos/:id', (req, res) =>{
  let todoUpdated = false;
  todos = todos.map((todo) =>{
    if(todo.id === String(req.params.id)){
      todoUpdated = true;
      return { ...todo, ...req.body, id:todo.id};
    }
    return todo;
  });
  return res.send(todoUpdated);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter((todo) => todo.id !== String(req.params.id));
  return res.send(todos);
});

const port = process.env.PORT || 8080;

app.listen(port, (error) =>{
  if (error){
    console.log("Error running the server");
  }
  console.log("Server is running on port", Number(port));
});