const getProducts = (req, res) => {
  res.json({
    msg: 'get all products',
  })
}

module.exports = {
  getProducts,
}
