const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const friendRouter = require('./friendRouter')
const chatRouter = require('./chatRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/brand', brandRouter)
router.use('/friend', friendRouter)
router.use('/chat', chatRouter)

module.exports = router
