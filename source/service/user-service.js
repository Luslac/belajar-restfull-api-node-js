import { validate } from "../validation/validation.js";
import { loginUserValidation, register_UserValidation } from "../validation/user_validation.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

// Untuk Registrasi User
const registration = async (request) => {
    const user_current = validate(register_UserValidation, request)

    const is_user_exists_count = await prisma.user.count({
        where: {
            username: user_current.username
        }
    })

    console.log("LOG DEBUG SERVICE: HOW MANY USER? -> ", is_user_exists_count);

    if (is_user_exists_count >= 1) {
        throw new ResponseError(400, "User already exists")
    }
    
    user_current.password = await bcrypt.hash(user_current.password, 10)

    const result = await prisma.user.create({
        data: user_current,
        select: {
            username: true,
            name: true,
        }
    })
    return result
}


// Untuk Login User
const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request)

    const user = await prisma.user.findFirst({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    })

    if (!user) {
        throw new ResponseError(401, "Username Or Password Wrong!!")
    }

    const validatePassword = await bcrypt.compare(loginRequest.password, user.password)

    if (!validatePassword) {
        throw new ResponseError(401, "Username Or Password Wrong!!")
    }

    const token = uuid().toString()
    return prisma.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true,
            username: true
        }
    })
}

export default {
    registration,
    login
}