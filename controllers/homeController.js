const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Todo = require('../models/todo')

const getLoggedInUser = async (req) => {
  const token = req.headers.cookie.split('token=')[1]
  const userId = jwt.decode(token).id
  return await User.findById(userId)
}

exports.homeGET = async (req, res, next) => {
  const user = await getLoggedInUser(req)
  await user.populate('todos').execPopulate()

  res.render('home', { user, todos: user.todos })
}

exports.newTodo = async (req, res, next) => {
  try {
    const user = await getLoggedInUser(req)
    const todo = new Todo({
      message: req.body.todo,
      complete: false,
      owner: user._id
    })
    await todo.save()
    res.redirect('/home')
  } catch (error) {
    res.send('There was an error')
  }
}