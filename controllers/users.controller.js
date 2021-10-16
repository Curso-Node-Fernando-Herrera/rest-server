const bcrypt = require('bcryptjs')
const User = require('../models/user')

const getUsers = async (req, res) => {
  const { limit = 10, offset = 0 } = req.query
  const EXIST_USERS = { state: true }

  const [totalUsers, users] = await Promise.all([
    await User.count(EXIST_USERS),
    await User.find(EXIST_USERS).limit(Number(limit)).skip(Number(offset)),
  ])

  res.json({
    totalUsers,
    users,
  })
}

const postUsers = async (req, res) => {
  const { body } = req
  const { displayName, email, password, avatar, role, state, google } = body

  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)

  const user = new User({
    displayName,
    email,
    password: passwordHash,
    avatar,
    role,
    state,
    google,
  })

  await user.save()

  res.json({
    user,
  })
}

const putUsers = async (req, res) => {
  const { id } = req.params

  const { displayName, password } = req.body

  const user = await User.findByIdAndUpdate(id, {
    displayName,
    password,
  })

  res.json({
    user,
  })
}

const patchUsers = (req, res) => {
  res.json({
    newUser: 'madeval',
    newAvatar: null,
  })
}

const deleteUsers = async (req, res) => {
  const { id } = req.params

  const user = await User.findByIdAndUpdate(id, { state: false })

  res.json({
    user,
  })
}

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
}
