const isFileExist = (req, res, next) => {
  const { files } = req
  const { image } = files

  const isfileNotCorrect = !files || Object.keys(files).length === 0 || !image

  if (isfileNotCorrect) {
    return res.status(400).json({
      error: 'File not support or not exist',
    })
  }

  next()
}

module.exports = {
  isFileExist,
}
