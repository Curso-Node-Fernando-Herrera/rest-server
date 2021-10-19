const Product = require('../models/product')

const getProducts = async (req, res) => {
  const { limit = 20, skip = 0 } = req.query

  const [productList, productsCount] = await Promise.all([
    await Product.find({ state: true })
      .limit(Number(limit))
      .skip(Number(skip))
      .populate('user', 'displayName')
      .populate('category', 'name'),
    await Product.count({ state: true }),
  ])

  res.json({
    productList,
    productsCount,
  })
}

const getProduct = async (req, res) => {
  const { id } = req.params

  const productFound = await Product.findById(id)
    .populate('user', 'displayName')
    .populate('category', 'name')

  if (!productFound) {
    return res.status(400).json({
      error: 'Product not exist',
    })
  }

  if (productFound.state === 'false') {
    return res.status(400).json({
      error: 'Product was delete',
    })
  }

  res.json(productFound)
}

const createProduct = async (req, res) => {
  const uid = req.uid
  const dataProduct = req.body
  const name = dataProduct.name.toUpperCase()

  const productFound = await Product.findOne({ name })

  if (productFound) {
    return res.status(400).json({
      error: 'Product was exist',
    })
  }

  const newDataProduct = {
    ...dataProduct,
    user: uid,
    name,
  }

  const newProduct = new Product(newDataProduct)
  await newProduct.save()

  res.status(201).json(newProduct)
}

const uploadProduct = async (req, res) => {
  const { id } = req.params

  const { state, user, ...dataUpdate } = req.body
  dataUpdate.name = dataUpdate.name.toUpperCase()

  const productFound = await Product.findByIdAndUpdate(id, dataUpdate, {
    new: true,
  })

  if (!productFound) {
    return res.status(400).json({
      error: 'Product not exist',
    })
  }

  if (!productFound.state) {
    return res.status(400).json({
      error: 'Product was deleted',
    })
  }

  res.json(productFound)
}

const deleteProduct = async (req, res) => {
  const { id } = req.params

  const foundProduct = await Product.findByIdAndUpdate(id, { state: false })

  if (!foundProduct) {
    return res.status(400).json({
      error: 'product not exist',
    })
  }

  if (foundProduct.state === 'false') {
    return res.status(400).json({
      error: 'product was deleted before',
    })
  }

  res.json({
    message: `Product with name ${foundProduct.name} was deleted`,
  })
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  uploadProduct,
  deleteProduct,
}
