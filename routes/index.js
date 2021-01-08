const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

module.exports = router