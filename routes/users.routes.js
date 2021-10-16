const { Router } = require('express')
const { body, check, param } = require('express-validator')

const { tokenValidator, userValidator } = require('../middlewares')

const {
  roleValidator,
  emailValidator,
  idValidator,
} = require('../validators/userValidator')

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

router.put(
  '/:id',
  [
    tokenValidator,
    check('id', 'Is not ID allowed').isMongoId(),
    check('id').custom(idValidator),
    body('role', 'Role is missing').notEmpty(),
    body('role').custom(roleValidator),
    userValidator,
  ],
  putUsers
)

router.post(
  '/',
  [
    body('displayName', 'Name is required').notEmpty(),
    body('email', 'Most be a email').isEmail(),
    body('email').custom(emailValidator),
    body('password', 'Is required had more 6 letters').isLength({ min: 6 }),
    body('password', 'Must be a strong password').isStrongPassword(),
    body('role').custom(roleValidator),
    userValidator,
  ],
  postUsers
)

router.patch('/', patchUsers)

router.delete(
  '/:id',
  [
    tokenValidator,
    param('id').isMongoId(),
    param('id').custom(idValidator),
    userValidator,
  ],
  deleteUsers
)

module.exports = router
