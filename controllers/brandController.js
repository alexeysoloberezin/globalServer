const {Brand} = require("../models/models");
const ApiError = require("../error/ApiError");

class brandController {
    async create(req, res, next) {
        try{
            const { name } = req.body
            const type = await Brand.create({name})
            return res.json(type)
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res, next) {
        try{
            const types = await Brand.findAll()
            return res.json(types)
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res, next) {
        const { id } = req.body
        if (!id) return next(ApiError.badRequest('Id is required'))
        try{
            await Brand.destroy({
                where: { id }
            })
            return res.json({message: 'good'})
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new brandController()
