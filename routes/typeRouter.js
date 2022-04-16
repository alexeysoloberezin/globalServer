const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middlware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), typeController.create)
router.get('/all', typeController.getAll)
router.delete('/', checkRole('ADMIN'), typeController.delete)


module.exports = router

