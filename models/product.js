const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  state: {
    type: String,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Necesary that one user create this product'],
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
  image: {
    type: String,
  },
})

ProductSchema.methods.toJSON = function () {
  const { __v, _id: id, ...profuctData } = this.toObject()

  return {
    ...profuctData,
    id,
  }
}

module.exports = model('Product', ProductSchema)
