const Role = require('../models/role')
const User = require('../models/user')

const roleValidator = async (role) => {
  const roleExist = await Role.findOne({ role })
  if (!roleExist) throw new Error(`${role} is not allowed`)
}

const emailValidator = async (email) => {
  const existEmail = await User.findOne({ email })
  if (existEmail) throw new Error('This email was exist')
}

const idValidator = async (id) => {
  const userExist = await User.findById(id)
  if (!userExist) throw new Error('ID not exist')
}

module.exports = {
  roleValidator,
  emailValidator,
  idValidator,
}
