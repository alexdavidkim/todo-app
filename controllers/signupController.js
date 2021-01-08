const express = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signupGET = (req, res, next) => {
  res.render('signup', { errors: null })
}

exports.signupPOST = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: res.locals.hashedPW
    })
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' })
    res.cookie('token', token, { secure: false, httpOnly: true, maxAge: 604800000 })
    res.redirect('/home')
  } catch (error) {
    if (error.errors.username || error.errors.email) {
      return res.render('signup', { errors: [{ msg: 'Username or email already taken' }] })
    }
    res.status(500).send(error)   
  }
}