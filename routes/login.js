const express = require('express')
const { loginGET, loginPOST } = require('../controllers/loginController')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.get('/login', loginGET)

router.post('/login', loginPOST)

module.exports = router