import addressService from "../service/address-service.js"

const create = async(req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const request = req.body

        const result = await addressService.createAddress(user, contactId, request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const addressId = req.params.addressId

        const result = await addressService.getAddress(user, contactId, addressId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const addressId = req.params.addressId
        const request = req.body

        const result = await addressService.updateAddress(user, contactId, addressId, request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const addressId = req.params.addressId

        const result = await addressService.deleteAddress(user, contactId, addressId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const list = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId

        const result = await addressService.listAddress(user, contactId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}
export default {
    create,
    get,
    update,
    remove,
    list
}