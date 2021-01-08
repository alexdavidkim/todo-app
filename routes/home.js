const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { isAuthenticated } = require('../utils/middleware')

const router = express.Router()

const todos = [
  {
    message: 'Herbology homework',
    complete: true
  },
  {
    message: 'Cut hair',
    complete: false
  },
  {
    message: 'Feed Crookshanks',
    complete: false
  }
]

router.get('/home', isAuthenticated, async (req, res, next) => {
  const token = req.headers.cookie.split('token=')[1]
  const userId = jwt.decode(token).id
  const user = await User.findById(userId)

  res.render('home', { user, todos })
})

module.exports = router