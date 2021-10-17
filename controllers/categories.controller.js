const Category = require('../models/category')

const getCategories = async (req, res) => {
  const SEARCH_FILTER = { state: true }

  const { limit = 20, skip = 0 } = req.query

  const [listOfCategories, numOfCategories] = await Promise.all([
    await Category.find(SEARCH_FILTER)
      .limit(Number(limit))
      .skip(Number(skip))
      .populate('user', 'displayName'),
    await Category.count(SEARCH_FILTER),
  ])

  res.json({ listOfCategories, numOfCategories })
}

const getCategory = async (req, res) => {
  const { id } = req.params

  const foundCategory = await Category.findById(id).populate(
    'user',
    'displayName'
  )

  if (!foundCategory) {
    return res.status(400).json({
      error: 'Not exist any category with this ID',
    })
  }

  if (!foundCategory.state) {
    return res.status(400).json({
      error: 'This a deleted category',
    })
  }

  res.json(foundCategory)
}

const createCategory = async (req, res) => {
  const name = req.body.name.toUpperCase()

  const foundCategory = await Category.findOne({ name })

  if (foundCategory) {
    return res.status(400).json({
      error: `${name} category was exist`,
    })
  }

  const dataCategory = {
    name,
    user: req.uid,
  }

  const newCategory = new Category(dataCategory)
  await newCategory.save()

  res.status(201).json(newCategory)
}

const uploadCategory = async (req, res) => {
  const { id } = req.params
  const name = req.body.name.toUpperCase()

  const foundCategory = await Category.findByIdAndUpdate(id, {
    name,
  })

  if (!foundCategory) {
    return res.status(400).json({
      error: 'category not found',
    })
  }

  if (!foundCategory.state) {
    return res.status(400).json({
      error: 'this a deleted category',
    })
  }

  res.json(foundCategory)
}

const deleteCategory = async (req, res) => {
  const { id } = req.params

  const foundCategory = await Category.findByIdAndUpdate(id, { state: false })

  if (!foundCategory) {
    res.status(400).json({
      error: 'Not found any category with this ID',
    })
  }

  res.json(foundCategory)
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  uploadCategory,
  deleteCategory,
}
