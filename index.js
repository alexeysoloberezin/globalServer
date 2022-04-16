require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const sequelize = require('./databasepg')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middlware/ErrorHandlingMiddleware')
const websocketStart = require('./webSocketStart')
const startStatic = require("./staticStart");


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


app.use(errorHandler)
// last middleware


const start = async () => {
    try {
        websocketStart()
        await startStatic(app)
    } catch (err) {
        console.log(err)
    }
}

start()


