const mongoose = require('mongoose')
const { isEmail } = require('validator')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    validate: isEmail
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })

const User = mongoose.model('User', userSchema)

module.exports = User