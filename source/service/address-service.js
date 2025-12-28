import { prisma } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js"
import { getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"


const checkContactMustExist = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId)
    const totalContactInDatabase = await prisma.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })
    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "Contact Not Found!")
    }

    return contactId
}
const createAddress = async (user, contactId, request) => {
    contactId = await checkContactMustExist(user, contactId)
    const address = validate(createAddressValidation, request)
    address.contact_id = contactId

    return prisma.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}   

const getAddress = async (user, contactId, addressId) => {
    contactId = await checkContactMustExist(user, contactId)
    addressId = validate(getAddressValidation, addressId)

    const address = await prisma.address.findFirst({
        where: {
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

    if (!address) {
        throw new ResponseError(404, "Address Not FOUND!")
    }

    return address
}

const updateAddress = async (user, contactId, addressId, request) => {
    contactId = await checkContactMustExist(user, contactId)
    addressId = validate(getAddressValidation, addressId)
    const addressData = validate(updateAddressValidation, request)
    const totalAddressInDb = await prisma.address.count({
        where: {
            contact_id: contactId, 
            id: addressId         
        }
    })
    if (totalAddressInDb !== 1) {
        throw new ResponseError(404, "Address Not Found")
    }

    return prisma.address.update({
        where: {
            id: addressId
        },
        data: addressData,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

const deleteAddress = async (user, contactId, addressId) => {
    contactId = await checkContactMustExist(user, contactId)
    addressId = validate(getAddressValidation, addressId)

    const totalAddressInDb = await prisma.address.count({
        where: {
            contact_id: contactId, 
            id: addressId         
        }
    })
    if (totalAddressInDb !== 1) {
        throw new ResponseError(404, "Address Not Found")
    }

    return prisma.address.delete({
        where: {
            id: addressId
        }
    })
}

const listAddress = async (user, contactId) => {
    contactId = await checkContactMustExist(user, contactId)

    return prisma.address.findMany({
        where: {
            contact: {
                username: user.username
            }
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}
export default {
    createAddress,
    getAddress,
    updateAddress,
    deleteAddress,
    listAddress
}