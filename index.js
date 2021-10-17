const express = require('express')
const cors = require('cors')

require('dotenv').config()

const { dbConection } = require('./database/config')

const app = express()
dbConection()
const port = process.env.PORT

// CORS
app.use(cors())
// get static content from public folder
app.use(express.static('public'))
// leer y parcear json que viene del body de mis post, etc
app.use(express.json())

// routers
app.use('/auth', require('./routes/auths.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/categories', require('./routes/categories.routes'))
app.use('/api/products', require('./routes/products.routes'))

app.listen(port, () => {
  console.log(`Connecting for http://localhost:${port}`)
})
