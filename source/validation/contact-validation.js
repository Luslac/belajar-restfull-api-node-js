import {z} from "zod";

const contactValidation = z.object({
    firstName: z.string().max(100),
    lastName: z.string().max(100).optional(),
    email: z.string().max(200).optional(),
    phone: z.string().max(20).optional()
})

const getContactValidation = z.coerce.number().positive()

const updateContactValidation = z.object({
    id: z.coerce.number().positive(),
    firstName: z.string().max(100).optional(),
    lastName: z.string().max(100).optional(),
    email: z.string().max(200).optional(),
    phone: z.string().max(20).optional(),
})

const searchValueValidation = z.object({
    page: z.coerce.number().min(1).positive().default(1),
    size: z.coerce.number().min(1).max(100).default(10),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional()
})

export {
    contactValidation,
    getContactValidation,
    updateContactValidation,
    searchValueValidation
}