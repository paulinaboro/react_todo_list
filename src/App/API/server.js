const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json()); //old for json

var fs = require('fs');

let todos =
[];

const { get } = require('http');
const { json } = require('express');

// const json_data = require('./todos.json');

app.get('/todos', (req, res, next) => {

  return  res.send(todos); 

});

let id = 2;

// Add a new todo
app.post('/todos/add', (req, res) => {
id = id + 1;
let newTodo = {...req.body};
newTodo.id = id;

todos.push(newTodo);

return res.send(todos);
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find((todo) => todo.is === Number(req.params.id));
  return res.send(todo);
})

app.patch('/todos/:id', (req, res) =>{
  let todoUpdated = false;
  todos = todos.map((todo) =>{
    if(todo.id === Number(req.params.id)){
      todoUpdated = true;
      return { ...todo, ...req.body, id:todo.id};
    }
    return todo;
  });
  return res.send(todoUpdated);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter((todo) => todo.id !== Number(req.params.id));
  return res.send({ data:null });
});

const port = process.env.PORT || 8080;
//comment

app.listen(port, (error) =>{
  if (error){
    console.log("Error running the server");
  }
  console.log("Server is running on port", Number(port));
});