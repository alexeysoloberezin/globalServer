const sequelize = require("./databasepg");

async function startStatic(app){
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(process.env.PORT, () => {
        console.log(`----------------------------\n:) Server started on post ${process.env.PORT}`)
    })
}


module.exports = startStatic
