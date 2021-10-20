const path = require('path')
const { v4: uuidv4 } = require('uuid')

const imageValidator = (image, parentPath = '') => {
  const TYPE_IMAGES = ['png', 'jpg', 'jpeg', 'gif']

  return new Promise((resolve, reject) => {
    const { name } = image

    const [imageType] = name.split('.').slice(-1)

    if (!TYPE_IMAGES.includes(imageType)) {
      return reject('Format image not support')
    }

    const fieldName = `${uuidv4()}.${imageType}`
    const uploadPath = path.join(
      __dirname,
      '../uploads/',
      parentPath,
      fieldName
    )

    image.mv(uploadPath, (err) => {
      if (err) {
        return reject(err)
      }

      resolve(fieldName)
    })
  })
}

module.exports = { imageValidator }
