const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    if (req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(401).json({message: 'User is not authorized'})

        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    }catch (err) {
        res.status(401).json({message: 'User is not authorized', err})
    }
}
