const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'need user to approve create a category'],
  },
  image: {
    type: String,
  },
})

CategorySchema.methods.toJSON = function () {
  const { __v, _id: id, ...categoryData } = this.toObject()

  return {
    ...categoryData,
    id,
  }
}

module.exports = model('Category', CategorySchema)
