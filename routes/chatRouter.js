const Router = require('express')
const router = new Router()
const chatController = require('../controllers/chatController')
const checkRole = require("../middlware/checkRoleMiddleware");

router.post('/addMessage', checkRole('USER'), chatController.addMessages)
router.get('/messages', checkRole('USER'), chatController.getMessages)


module.exports = router

