const { Router } = require('express')
const { body } = require('express-validator')
const router = Router()

const { postLogin, googleSignIn } = require('../controllers/auths.controller')
const { userValidator } = require('../middlewares/userValidator')

router.post(
  '/login',
  [
    body('email', 'Is not a email').isEmail(),
    body('password', 'Incorrect Password or email').isStrongPassword(),
    userValidator,
  ],
  postLogin
)

router.post(
  '/google',
  [body('token_id', 'Token Id is required').notEmpty(), userValidator],
  googleSignIn
)

module.exports = router
