const { model, Schema } = require('mongoose')

const UserSchema = Schema({
  displayName: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
})

UserSchema.methods.toJSON = function () {
  const { __v, password, _id: uid, ...user } = this.toObject()
  return {
    ...user,
    uid,
  }
}

module.exports = model('User', UserSchema)
