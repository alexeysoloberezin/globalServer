const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require("../models/models");
const ApiError = require("../error/ApiError");

class deviceController {
    async create(req, res, next) {
        try{
            let { name, price, brandId, typeId, info } = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({ name, price, brandId, typeId, img:  fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id,
                    })
                })
            }

            return res.json(device)
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res, next) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        try{
            if (!brandId && !typeId){
                devices = await Device.findAndCountAll({limit, offset})
            }
            if (brandId && !typeId){
                devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
            }
            if (!brandId && typeId){
                devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
            }
            if (brandId && typeId){
                devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
            }

            return res.json(devices)
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res, next) {
        const { id } = req.body
        if (!id) return next(ApiError.badRequest('Id is required'))
        try{
            await Device.destroy({
                where: { id }
            })
            return res.json({message: 'good'})
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getOne(req, res, next) {
        const { id } = req.params

        if (!id) return next(ApiError.badRequest('Id is required'))

        try{
            const device = await Device.findOne({
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            })
            return res.json(device)
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new deviceController()
