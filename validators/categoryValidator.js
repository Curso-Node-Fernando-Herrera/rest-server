const Category = require('../models/category')

const categoryExist = async (categoryID) => {
  const categoryFound = await Category.findById(categoryID)

  if (!categoryFound) {
    throw new Error('This category not exist')
  }

  if (categoryFound.state === 'false') {
    throw new Error('This category was deleted')
  }
}

module.exports = {
  categoryExist,
}
