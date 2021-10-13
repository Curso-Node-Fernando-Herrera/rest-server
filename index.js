const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = process.env.PORT

// CORS
app.use(cors())
// get static content from public folder
app.use(express.static('public'))
// leer y parcear json que viene del body de mis post, etc
app.use(express.json())

// routers
app.use('/api/users', require('./routes/users.routes'))

app.listen(port, () => {
  console.log(`Connecting for http://localhost:${port}`)
})
