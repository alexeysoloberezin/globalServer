const {Op} = require("sequelize");
const ApiError = require('../error/ApiError')
const {Friends, User} = require("../models/models");

class FriendController {
    async addFriend(req, res, next) {
        const {friendId, status = 1} = req.body

        const {id} = req.user
        if (!friendId) return next(ApiError.internal('Friend Id is required'))

        try {
            const friend =  await Friends.findOne({
                where: {
                    [Op.and]: [{ userId: id }, { friend_id: friendId }]
                }
            })

            if (!friend) {
                await Friends.create({userId: id, friend_id: friendId})
                return res.json({message: 'good'})
            }else{
                await Friends.update({status}, {
                    where: {
                        [Op.and]: [{ userId: id }, { friend_id: friendId }]
                    }
                })
                return res.json({message: 'good', status})
            }
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async removeFriend(req, res, next) {
        const {friendId} = req.body
        const {id} = req.user

        if (!friendId) return next(ApiError.internal('Friend Id is required'))

        try {
            await Friends.update({status: 0}, {
                where: {
                    [Op.and]: [{ userId: id }, { friend_id: friendId }]
                }
            })
            return res.json({message: 'good', status: 0})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getFriends(req, res, next) {
        const {id} = req.user

        if (!id) return next(ApiError.internal('Id is required'))
        const friends = await Friends.findAll({
                where:
                    {userId: id},
                include: [
                    {
                        model: User,
                        attributes: {exclude: ['password']}
                    }
                ],
            }
        )
        return res.json(friends)
    }
}

module.exports = new FriendController()
