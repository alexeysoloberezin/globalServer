const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res, next) {
        try{
            const { name } = req.body
            const type = await Type.create({name})
            return res.json(type)
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res, next) {
        try{
            const types = await Type.findAll()
            return res.json(types)
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res, next) {
        const { id } = req.body
        if (!id) return next(ApiError.badRequest('Id is required'))
        try{
            await Type.destroy({
                where: { id }
            })
            return res.json({message: 'good'})
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new TypeController()
