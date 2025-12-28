import contactService from "../service/contact-service.js"

const contact = async (req, res, next) => {
    try {
        const requestUserName = req.user
        const result = await contactService.createContact(requestUserName, req.body)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getContact = async (req, res, next) => {
    try {
        const requestid = req.params.contactId
        const user = req.user
        const result = await contactService.getContactForUserService(user, requestid)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateContact = async (req, res, next) => {
    try {
        const user = req.user
        const request = {
            ...req.body,                 
            id: req.params.contactId,     
        }
        const result = await contactService.updateContactService(user, request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteContact = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = parseInt(req.params.contactId)
        const result = await contactService.deleteContactService(user, contactId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const searchContact = async (req, res, next) => {
    try {
        const user= req.user
        const request = {
            name: req.query.name,
            phone: req.query.phone,
            email: req.query.email,
            page: req.query.page,
            size: req.query.size
        }
        const result = await contactService.searchContactService(user, request)
        res.status(200).json({
            data: result.data,
            paging: result.paging
        })
    } catch (error) {
        next(error)
    }
}
export default {
    contact,
    getContact,
    updateContact,
    deleteContact,
    searchContact
}