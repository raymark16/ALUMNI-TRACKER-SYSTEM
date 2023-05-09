const express = require('express')
const router = express.Router()
const { checkAuth } = require('../utils/checkAuth')
const {getUser} = require('../controller/User')

router.get('/user', checkAuth, getUser)

module.exports = router