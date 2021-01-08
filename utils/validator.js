const { check, validationResult } = require('express-validator')

const userValidationRules = [
    check('username')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Usernames must be at least 3 characters long'),

    check('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address'),

    check('password')
      .isLength({ min: 6 })
      .withMessage('Passwords must be at least 6 characters long')
]

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  return res.render('signup', { errors: errors.array() })
}

module.exports = { userValidationRules, validate }