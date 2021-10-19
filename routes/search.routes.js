const { Router } = require('express')
const { getSearch } = require('../controllers/search.controller')

const router = Router()

router.get('/:collection/:item', getSearch)

module.exports = router
