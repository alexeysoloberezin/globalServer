const Router = require('express')
const router = new Router()
const friendController = require('../controllers/friendController')
const authMiddleware = require("../middlware/authMiddleware")


router.post('/addFriend', authMiddleware, friendController.addFriend)
router.post('/removeFriend', authMiddleware, friendController.removeFriend)
router.get('/all', authMiddleware, friendController.getFriends)

module.exports = router
