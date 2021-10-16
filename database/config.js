const mongoose = require('mongoose')

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Database connected')
  } catch (error) {
    console.error(error)
    throw new Error('Impossible meet with database')
  }
}

module.exports = {
  dbConection,
}
