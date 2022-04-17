const {Messages,} = require("../models/models");
const ApiError = require("../error/ApiError");
const {Op} = require("sequelize");

class chatController {
    async addMessages(req, res) {
        let {message, room, userId} = req.body.message

        const createdMessage = await Messages.create({
            room,
            message,
            userId,
        })

        res.json(createdMessage)
    }

    async getMessages(req, res, next) {
        const { room } = req.query
        let { id } = req.user

        if (!id) return next(ApiError.internal('Id is required'))
        if (!room) return next(ApiError.internal('Room is required'))

        const messages = await Messages.findAll({
            where: {
                [Op.and]: [{ userId: id }, { room }]
            }
        })

        res.json(messages)
    }
}

module.exports = new chatController()
