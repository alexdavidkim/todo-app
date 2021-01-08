const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('useCreateIndex', true)

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'todo-app',
  useNewUrlParser: true,
  useUnifiedTopology: true
})
