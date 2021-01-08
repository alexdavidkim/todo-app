const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.loginGET = (req, res, next) => {
  res.render('login', { message: null })
}

exports.loginPOST = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    const match = await bcrypt.compare(req.body.password, user.password)

    if (user && match) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' })
      res.cookie('token', token, { secure: false, httpOnly: true, maxAge: 604800000 })
      res.redirect('/home')
    } 
    else {
      res.render('login', { message: 'Invalid credentials, please try again.' })
    }
  } catch (error) {
    res.status(500).send('Internal server error')
  }
}