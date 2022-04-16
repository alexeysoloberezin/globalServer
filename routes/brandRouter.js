const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require("../middlware/checkRoleMiddleware");

router.get('/all', brandController.getAll)
router.post('/create', checkRole('ADMIN'), brandController.create)
router.delete('/', checkRole('ADMIN'), brandController.delete)

module.exports = router
