const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const friendRouter = require('./friendRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/brand', brandRouter)
router.use('/friend', friendRouter)

module.exports = router
