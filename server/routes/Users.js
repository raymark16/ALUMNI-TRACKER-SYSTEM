const express = require('express')
const router = express.Router()
const {registerUser, loginUser,logout, isLoggedIn, updateUser, getUsers, getPrograms, updateJob} = require('../controller/Users')
const { checkAuth } = require('../utils/checkAuth')

router.post('/register-user', registerUser)
router.post('/login-user', loginUser)
router.patch('/update-user', checkAuth, updateUser)
router.patch('/update-job', checkAuth, updateJob)
router.get('/get-users', checkAuth, getUsers)
router.get('/get-programs', getPrograms)
router.get('/logout', logout)
router.get('/is_logged_in', isLoggedIn)



module.exports = router