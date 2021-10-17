const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenValidator = async (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      error: 'Token is missing',
    })
  }

  try {
    const { id: uid } = jwt.verify(token, process.env.JWT_KEY)
    const userFound = await User.findById(uid)

    if (!userFound) {
      return res.status(401).json({
        error: 'User not exist in database',
      })
    }

    if (!userFound.state) {
      return res.status(401).json({
        error: 'User was deleted',
      })
    }

    req.uid = uid
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({
      error: 'Invalid token',
    })
  }
}

module.exports = {
  tokenValidator,
}
