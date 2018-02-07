var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const Todo = require("../models/todo");

const app = express()
app.get('/todos', (request, response) => {
  Todo.find().then(todos => {
    response.json({todos})
  })
})
app.post('/post', (request, response) => {
  let todo = new Todo(request.body);
  todo.save((err, createdTodoObject) => {
      if (err) {
          response.status(500).send(err);
      }
      response.status(200).send(createdTodoObject);
  });
})
app.post('/put/:todoId', (request, response) => {
  const Todo = require("../models/todo")
  Todo.findById(request.params.todoId, (err, todo) => {
    if (err) {
      response.status(500).send(err)
    } else {
      todo.description = request.body.description || todo.description;
      todo.done = request.body.done || todo.done;
      todo.save((err, todo) => {
          if (err) {
              response.status(500).send(err)
          }
          response.status(200).send(todo)
      })
    }
  })
})
app.post('/delete/:todoId', (request, response) => {
  console.log(request.params.todoId)
  Todo.findByIdAndRemove(request.params.todoId, (err, todo) => {
    let res = {
      message: "Todo successfully deleted",
      id: todo._id
    }
    response.status(200).send(res)
  })
})

module.exports = app;
