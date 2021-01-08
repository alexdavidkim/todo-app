const express = require('express')

const router = express.Router()

router.get('/logout', (req, res, next) => {
  res.clearCookie('token')
  res.redirect('/')
})

module.exports = router