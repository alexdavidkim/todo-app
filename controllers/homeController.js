const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.homeGET = async (req, res, next) => {
  const token = req.headers.cookie.split('token=')[1]
  const userId = jwt.decode(token).id
  const user = await User.findById(userId)
  await user.populate('todos').execPopulate()
  
  res.render('home', { user, todos: user.todos })
}

exports.homePOST = (req, res) => {
  res.send(req.body.todo)
}