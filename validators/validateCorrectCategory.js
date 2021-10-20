const validateCorrectCategory = (category, listCategories) => {
  const isCorrectCategory = listCategories.includes(category)

  if (!isCorrectCategory) throw new Error('Category is not approve')
  return true
}

module.exports = {
  validateCorrectCategory,
}
