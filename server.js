const express = require('express')
require('./db/db')
const indexRoutes = require('./routes/index')
const signUpRoutes = require('./routes/signup')
const loginRoutes = require('./routes/login')
const logoutRoutes = require('./routes/logout')
const homeRoutes = require('./routes/home')
const { db } = require('./models/user')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(indexRoutes)
app.use(signUpRoutes)
app.use(loginRoutes)
app.use(logoutRoutes)
app.use(homeRoutes)

// Catch all middleware
app.use((req, res) => {
  res.status(404).send('Put a 404.ejs file here!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
