async function startStatic(app){
    app.listen(process.env.PORT, () => {
        console.log(`----------------------------\n:) Server started on post ${process.env.PORT}`)
    })
}

module.exports = startStatic
