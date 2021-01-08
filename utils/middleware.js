const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.hashPW = async (req, res, next) => {
  res.locals.hashedPW = await bcrypt.hash(req.body.password, 8)
  next()
}

exports.isAuthenticated = (req, res, next) => {
  const cookie = req.headers.cookie
  if (!cookie) {
    return res.send('There was no token')
  }
  
  const token = cookie.split('token=')[1]

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.send('Token not verified correctly')
    }
    req.user = user
    next()
  })
}