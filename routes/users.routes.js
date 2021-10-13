const { Router } = require('express')
const {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
} = require('../controllers/users.controller')

const router = Router()

// user
router.get('/', getUsers)
router.put('/', putUsers)
router.post('/', postUsers)
router.patch('/', patchUsers)
router.delete('/', deleteUsers)

module.exports = router