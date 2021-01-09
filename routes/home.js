const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Todo = require('../models/todo')
const { isAuthenticated } = require('../utils/middleware')
const { homeGET, newTodo } = require('../controllers/homeController')

const router = express.Router()

router.use(express.urlencoded({extended: true}))

router.get('/home', isAuthenticated, homeGET)

router.post('/newtodo', newTodo)

module.exports = router