const { Router } = require('express')
const { body, param } = require('express-validator')
const {
  getCategories,
  createCategory,
  getCategory,
  uploadCategory,
  deleteCategory,
} = require('../controllers/categories.controller')
const { tokenValidator } = require('../middlewares/tokenValidator')
const { userValidator } = require('../middlewares/userValidator')

const router = Router()

router.get('/', getCategories)

router.get(
  '/:id',
  [param('id', 'Is not a ID').isMongoId(), userValidator],
  getCategory
)

router.post(
  '/',
  [
    tokenValidator,
    body('name', 'name of category is required').notEmpty(),
    userValidator,
  ],
  createCategory
)

router.put(
  '/:id',
  [
    tokenValidator,
    param('id', 'Is not a ID').isMongoId(),
    body('name').notEmpty(),
    userValidator,
  ],
  uploadCategory
)

router.delete(
  '/:id',
  [tokenValidator, param('id', 'Is not a ID').isMongoId(), userValidator],
  deleteCategory
)

module.exports = router
