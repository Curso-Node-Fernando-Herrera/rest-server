const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

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

// permite hacer un upload de archivos de manera sencilla
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
  })
)

// routers
app.use('/auth', require('./routes/auths.routes'))
app.use('/api/search', require('./routes/search.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/categories', require('./routes/categories.routes'))
app.use('/api/products', require('./routes/products.routes'))
app.use('/api/upload', require('./routes/uploads.routes'))

app.listen(port, () => {
  console.log(`Connecting for http://localhost:${port}`)
})
