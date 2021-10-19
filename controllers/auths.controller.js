const bcrypt = require('bcryptjs')
const { googleVerify } = require('../helpers/googleVerify')
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

const googleSignIn = async (req, res) => {
  const { token_id } = req.body
  try {
    const payload = await googleVerify(token_id)
    const { name, email, avatar } = payload

    let user = await User.findOne({ email })

    if (!user) {
      const userData = {
        displayName: name,
        email,
        password: 'Qwer1234@!+',
        avatar,
        role: 'USER_ROLE',
        google: true,
      }

      user = new User(userData)
      await user.save()
    }

    if (!user.state) {
      return res.state(401).json({
        error: 'User was deleted',
      })
    }

    const token = await jwtGenerator({ uid: user.id })

    res.json({
      user: user,
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      error: 'impossible conecting with google',
    })
  }
}

module.exports = {
  postLogin,
  googleSignIn,
}
