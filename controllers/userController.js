const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, Friends} = require('../models/models')
const {Op} = require("sequelize");

const generateToken = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body

        if (!email) return next(ApiError.internal('Bad email'))
        if (!password) return next(ApiError.internal('Bad password'))

        const candidate = await User.findOne({where: {email}})

        if (candidate) return next(ApiError.internal('Email is busy'))

        const hashPassword = await bcrypt.hash(password, 4)

        const user = await User.create({email, password: hashPassword, role})
        const basket = await Basket.create({userId: user.id})

        const token = generateToken(user.id, email, role)
        return res.json({token, role: user.role})
    }

    async login(req, res, next) {
        const {email, password} = req.body

        const user = await User.findOne({where: {email}})
        if (!user) return next(ApiError.internal('User is not found'))

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) return next(ApiError.internal('Incorrect password'))

        const token = generateToken(user.id, email, user.role)
        return res.json({token, role: user.role})
    }

    async check(req, res) {
        const token = generateToken(req.user.id, req.user.email, req.user.role)
        return res.json({token, role: req.user.role})
    }

    async getAll(req, res) {
        const {id} = req.user


        const users = await User.findAll({
            where: {
                id: {[Op.ne]: id}
            },
            attributes: {exclude: ['password']},
        })
        const friends = await Friends.findAll({ where: {userId: id}})

        const newUsers = users.map(user => {
            let newUser = user.dataValues

            friends.forEach(friend => {
                if (user.dataValues.id === friend.dataValues.friend_id){
                    newUser = {...user.dataValues, statusFriend: friend.dataValues.status}
                }
            })
            return {...newUser}
        })

        return res.json(newUsers)
    }

    async getInfo(req, res, next) {
        const {userId} = req.query
        const {id} = req.user
        let user = null

        if (userId) {
            user = await User.findOne({where: {userId}, attributes: {exclude: ['password']}})
        } else {
            if (!id) return next(ApiError.internal('Id is required'))
            user = await User.findOne({where: {id}, attributes: {exclude: ['password']}})
        }

        return res.json(user)
    }
}

module.exports = new UserController()
