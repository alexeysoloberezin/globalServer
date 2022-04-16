const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require("../middlware/authMiddleware")

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

router.get('/all', authMiddleware, userController.getAll)
router.get('/info', authMiddleware, userController.getInfo)

module.exports = router
