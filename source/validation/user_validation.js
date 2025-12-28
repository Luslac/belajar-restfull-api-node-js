import {z} from "zod";

const register_UserValidation = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(8).max(100),
    name: z.string().min(3).max(100),
})
const loginUserValidation = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(8).max(100),
})

const getUserValidation = z.object({
    username: z.string().min(3).max(100)
})

const updateUserValidation = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(8).max(100).optional(),
    name: z.string().min(3).max(100).optional(),
})

export {
    register_UserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}