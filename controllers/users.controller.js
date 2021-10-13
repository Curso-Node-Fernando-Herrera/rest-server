const getUsers = (req, res) => {
  const { query } = req
  res.json({
    displayName: 'Mateoac12',
    avatar: null,
    ...query,
  })
}

const postUsers = (req, res) => {
  const { body } = req
  const { displayName, nickName } = body

  res.json({
    displayName,
    nickName,
  })
}

const putUsers = (req, res) => {
  res.json({
    newUser: 'madeval',
    newAvatar: null,
  })
}

const patchUsers = (req, res) => {
  res.json({
    newUser: 'madeval',
    newAvatar: null,
  })
}

const deleteUsers = (req, res) => {
  res.json({
    newUser: 'madeval',
    newAvatar: null,
  })
}

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
}
