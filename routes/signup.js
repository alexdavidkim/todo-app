const express = require('express')
const { userValidationRules, validate } = require('../utils/validator')
const { signupGET, signupPOST } = require('../controllers/signupController')
const { hashPW } = require('../utils/middleware')

const router = express.Router()

router.use(express.urlencoded({extended: true}))

router.get('/signup', signupGET)

router.post('/signup', userValidationRules, validate, hashPW, signupPOST)

module.exports = router