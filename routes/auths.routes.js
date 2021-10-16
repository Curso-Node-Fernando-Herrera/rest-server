const { Router } = require('express')
const { body } = require('express-validator')
const router = Router()

const { postLogin } = require('../controllers/auths.controller')
const { userValidator } = require('../middlewares/userValidator')

router.use(
  '/login',
  [
    body('email', 'Is not a email').isEmail(),
    body('password', 'Incorrect Password or email').isStrongPassword(),
    userValidator,
  ],
  postLogin
)

module.exports = router
