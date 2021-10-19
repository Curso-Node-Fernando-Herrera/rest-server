const { Router } = require('express')
const { body, param } = require('express-validator')

const {
  getProducts,
  createProduct,
  getProduct,
  uploadProduct,
  deleteProduct,
} = require('../controllers/products.controller')

const { tokenValidator } = require('../middlewares/tokenValidator')
const { userValidator } = require('../middlewares/userValidator')
const { categoryExist } = require('../validators/categoryValidator')

const router = Router()

router.get('/', getProducts)

router.get(
  '/:id',
  [param('id', 'must be id').isMongoId(), userValidator],
  getProduct
)

router.post(
  '/',
  [
    tokenValidator,
    body('name', 'name of product is required').notEmpty(),
    body('category', 'category id is required').notEmpty(),
    body('category', 'category must be a id').isMongoId(),
    body('category').custom(categoryExist),
    userValidator,
  ],
  createProduct
)

router.put(
  '/:id',
  [
    tokenValidator,
    param('id', 'Must be a valid ID').isMongoId(),
    userValidator,
  ],
  uploadProduct
)

router.delete(
  '/:id',
  [
    tokenValidator,
    param('id', 'Must be a valid ID').isMongoId(),
    userValidator,
  ],
  deleteProduct
)

module.exports = router
