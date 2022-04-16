const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require("../middlware/checkRoleMiddleware");

router.post('/create', checkRole('ADMIN'), deviceController.create)
router.get('/all', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/', checkRole('ADMIN'), deviceController.delete)

module.exports = router
