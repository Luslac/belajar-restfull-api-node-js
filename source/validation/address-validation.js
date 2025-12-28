import {z} from "zod"

const createAddressValidation = z.object({
    country: z.string().max(100),
    province: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    street: z.string().max(100).optional(),
    postal_code: z.string().max(100)
})

const getAddressValidation = z.coerce.number().positive()

const updateAddressValidation = z.object({
    country: z.string().max(100).optional(),
    province: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    street: z.string().max(200).optional(),
    postal_code: z.string().max(100).optional()
})
export {
    createAddressValidation,
    getAddressValidation,
    updateAddressValidation
}