const express = require('express')
const router = express.Router()
const {registerUser, loginUser,logout, isLoggedIn} = require('../controller/Users')

router.post('/register-user', registerUser)
router.post('/login-user', loginUser)
router.get('/logout', logout)
router.get('/is_logged_in', isLoggedIn)


module.exports = router