const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Todo = require('../models/todo')
const { isAuthenticated } = require('../utils/middleware')
const { homeGET, homePOST } = require('../controllers/homeController')

const router = express.Router()

router.get('/home', isAuthenticated, homeGET)

router.post('/createtodo', homePOST)

module.exports = router