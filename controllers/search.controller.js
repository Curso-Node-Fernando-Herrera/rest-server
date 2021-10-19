const User = require('../models/user')
const Category = require('../models/category')
const { ObjectId } = require('mongoose').Types
const Product = require('../models/product')

const listOfCollectionsToSearch = ['user', 'product', 'category']

const searchUser = async (item, res) => {
  const isMongoDB = ObjectId.isValid() // TRUE

  if (isMongoDB) {
    const userFound = await User.findById(item)
    return res.json(userFound)
  }

  const regex = new RegExp(item, 'i')
  const usersFound = await User.find({
    $or: [{ displayName: regex }, { email: regex }],
    $and: [{ state: true }],
  })

  res.json({
    results: usersFound,
  })
}

const searchCategory = async (item, res) => {
  const isMongoDB = ObjectId.isValid() // TRUE

  if (isMongoDB) {
    const categoryFound = await Category.findById(item)
    return res.json(categoryFound)
  }

  const regex = new RegExp(item, 'i')
  const categoriesFound = await Category.find({ name: regex, state: true })

  res.json({
    results: categoriesFound,
  })
}

const searchProduct = async (item, res) => {
  const isMongoDB = ObjectId.isValid() // TRUE

  if (isMongoDB) {
    const productFound = await Product.findById(item).populate(
      'category',
      'name'
    )
    return res.json(productFound)
  }

  const regex = new RegExp(item, 'i')
  const productsFound = await Product.find({
    name: regex,
    state: true,
  }).populate('category', 'name')

  res.json({
    results: productsFound,
  })
}

const allCollections = {
  user: searchUser,
  category: searchCategory,
  product: searchProduct,
  default: (res) =>
    res.status(500).json({
      error: `impossible search, check if your collection name exist or is valid. Must be ${listOfCollectionsToSearch}`,
    }),
}

const getSearch = async (req, res) => {
  const { collection, item } = req.params

  listOfCollectionsToSearch.includes(collection)
    ? await allCollections[collection](item, res)
    : allCollections.default(res)
}

module.exports = {
  getSearch,
}
