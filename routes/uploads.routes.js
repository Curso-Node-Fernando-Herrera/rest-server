const { Router } = require('express')
const { param } = require('express-validator')
const {
  uploadFiles,
  uploadFileOfItem,
} = require('../controllers/uploads.controller')
const { userValidator } = require('../middlewares')
const { isFileExist } = require('../middlewares/isFileExist')
const {
  validateCorrectCategory,
} = require('../validators/validateCorrectCategory')

const router = Router()

const listCategories = ['category', 'product', 'user']

router.post('/', isFileExist, uploadFiles)

router.put(
  '/:category/:item',
  [
    param('category').custom((category) =>
      validateCorrectCategory(category, listCategories)
    ),
    param('category', 'Must be not empty').notEmpty(),
    param('item', 'Item must be a correct ID').isMongoId(),
    param('item', 'Must be a id').notEmpty(),

    userValidator,
  ],
  uploadFileOfItem
)

module.exports = router
