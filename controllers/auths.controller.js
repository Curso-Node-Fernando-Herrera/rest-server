const bcrypt = require('bcryptjs')
const { jwtGenerator } = require('../helpers/jwtGenerator')
const User = require('../models/user')

const postLogin = async (req, res) => {
  const { body } = req
  const { email, password } = body

  try {
    const user = (await User.findOne({ email })) || {}
    const { state: isActiveUser, password: passwordHash = '', id } = user

    const isCorrectPassword = bcrypt.compareSync(password, passwordHash)
    const isUserFound = isCorrectPassword && user

    if (!isUserFound) {
      return res.status(400).json({
        error: 'Email or password incorrect',
      })
    }

    if (!isActiveUser) {
      return res.status(400).json({
        error: 'User not valid',
      })
    }

    const token = await jwtGenerator({ id })

    res.json({
      user,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Internal fatal error',
    })
  }
}

module.exports = {
  postLogin,
}
