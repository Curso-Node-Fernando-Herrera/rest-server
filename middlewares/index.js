const userValidator = require('../middlewares/userValidator')
const tokenValidator = require('../middlewares/tokenValidator')

module.exports = {
  ...userValidator,
  ...tokenValidator,
}
