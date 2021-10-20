const res = require('express/lib/response')
var cloudinary = require('cloudinary').v2
const User = require('../models/user')
const { imageValidator } = require('../validators/filesValidator')

cloudinary.config(process.env.CLOUDINARY_URL)

const uploadFiles = async (req, res) => {
  const { image } = req.files

  imageValidator(image)
    .then((path) => res.json({ path }))
    .catch((err) => res.status(400).json({ err }))
}

// -----------

const getUser = async (item, image) => {
  try {
    const newImageUpload = await cloudinary.uploader.upload(
      image.tempFilePath,
      {
        folder: 'users/img',
      }
    )
    const userData = await User.findByIdAndUpdate(item, {
      avatar: newImageUpload.secure_url,
    })

    const [typeFile] = userData.avatar.split('/').slice(-1)
    const [normalizeFile] = typeFile.split('.')

    cloudinary.uploader.destroy(normalizeFile)
  } catch (err) {
    console.log(err)
  }
}

const allCategories = {
  user: getUser,
}

const uploadFileOfItem = async (req, res) => {
  const { category, item } = req.params
  const { image } = req.files

  !image && res.status(400).json({ error: 'image not send' })
  await allCategories[category](item, image)

  res.json({
    category,
    item,
  })
}

module.exports = {
  uploadFiles,
  uploadFileOfItem,
}
