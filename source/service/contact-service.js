import { validate } from "../validation/validation.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { contactValidation, getContactValidation, searchValueValidation, updateContactValidation } 
from "../validation/contact-validation.js";

const createContact = async (user, request) => {
    const contact = validate(contactValidation, request)
    contact.username = user.username
    return prisma.contact.create({
        data: contact,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
        }
    })
}

const getContactForUserService = async (user, contactID) => {
    const contactIdValid = validate(getContactValidation, contactID)
    const result = await prisma.contact.findUnique({
        where: {
            username: user.username,
            id: contactIdValid
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
        }
    })
    if (!result) {
        throw new ResponseError(404, "Contact Not Found")
    }

    return result
}

const updateContactService = async (user, contactInfo) => {
    const contactValid = validate(updateContactValidation, contactInfo)
    const countContactInDatabase = await prisma.contact.count({
        where: {
            username: user.username,
            id: contactValid.id
        }
    })
    
    if (countContactInDatabase !== 1) {
        throw new ResponseError(404, "Contact Not Found")
    }

    return prisma.contact.update({
        where: {
            id: contactValid.id
        },
        data: contactValid,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
        }
    })
}

const deleteContactService = async (user, contactID) => {
    const contactIdValid = validate(getContactValidation, contactID)

    const countContactInDatabase = await prisma.contact.count({
        where: {
            username: user.username,
            id: contactIdValid
        }
    })
    if (countContactInDatabase !== 1) {
        throw new ResponseError(404, "Contact Not Found")
    }

    return prisma.contact.delete({
        where: {
            id: contactIdValid
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
        }
    })
}


const searchContactService = async (user, requestUser) => {
    const request = validate(searchValueValidation, requestUser)
    const { name, email, phone, page, size } = request
    const skip = (page - 1) * size
    
    const filters = [
        { username: user.username }
    ]

    if (name) {
        filters.push({
            OR: [
                { firstName: { contains: name } },
                { lastName: { contains: name } }
            ]
        })
    }
    if (email) {
        filters.push({
            email: { contains: email }
        })
    }

    if (phone) {
        filters.push({
            phone: { contains: phone }
        })
    }

    const contacts = await prisma.contact.findMany({
        where: {
            AND: filters 
        },
        take: size,
        skip: skip
    })

    const totalItems = await prisma.contact.count({
        where: {
            AND: filters
        }
    })

    return {
        data: contacts,
        paging : {
        page : page,
        total_page : Math.ceil(totalItems / size),
        total_item : totalItems
        }
    }
}





export default {
    createContact,
    getContactForUserService,
    updateContactService,
    deleteContactService,
    searchContactService
}