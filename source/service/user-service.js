import { validate } from "../validation/validation.js";
import { getUserValidation, loginUserValidation, register_UserValidation, updateUserValidation } 
from "../validation/user_validation.js";
import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


// Untuk Registrasi User
const registration = async (request) => {
    const user_current = validate(register_UserValidation, request)

    const is_user_exists_count = await prisma.user.count({
        where: {
            username: user_current.username
        }
    })

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

    const token = jwt.sign(
            { 
                username: user.username,  
                role: "user"              
            }, 
            process.env.JWT_SECRET,       
            { expiresIn: process.env.JWT_EXPIRES_IN } 
        )
    return {
        token: token,
        username: user.username
    }
}

// Untuk Login atau register menggunakan google
const loginOrRegisterGoogleService = async (googleProfile) => {
    const email = googleProfile.emails && googleProfile.emails[0] ? googleProfile.emails[0].value : null

    if (!email) throw new Error("Email Google tidak ditemukan!")

    const existingUser = await prisma.user.findFirst({
        where: { email: email }
    })

    if (existingUser) {
        return existingUser
    }
    const cleanName = googleProfile.displayName.replace(/\s+/g, '')
    const uniqueSuffix = Date.now()
    const newUser = await prisma.user.create({
        data: {
            username: `google_${cleanName}${uniqueSuffix}` ,
            email: email,
            name: googleProfile.displayName,
            googleId: googleProfile.id,
            password: null
    }
    });
    return newUser
}

const getUser = async (requestUserName) => {
    const resultUser = validate(getUserValidation, {username: requestUserName})
    
    const user = await prisma.user.findFirst({
        where: {
            username: resultUser.username
        },
        select: {
            username: true,
            name: true
        }
    })

    if (!user) {
        throw new ResponseError(404, "Username NOT Found")
    }

    return user
}

const updateUser = async (updateRequest) =>  {
    const resultUser = validate(updateUserValidation, updateRequest)

    const countUser = await prisma.user.count({
        where: {
            username: resultUser.username
        }
    })

    if (countUser !== 1) {
        throw new ResponseError(404, "USER NOT FOUND")
    }
    const data = {}
    if (resultUser.name) {
        data.name = resultUser.name
    }
    if (resultUser.password) {
        data.password = await bcrypt.hash(resultUser.password, 10)
    }

    return prisma.user.update({
        where: {
            username: resultUser.username
        },
        data: data,
        select: {
            username: true,
            name: true
        }
    })
}

const uploadAvatarUser = async (user, file) => {
    if (!file) {
        throw new ResponseError("File dont exist, upload image!")
    }

    const avatarPath = `/images/${file.filename}`

    const updateAvatar = await prisma.user.update({
        where: { username: user.username },
        data: { avatar: avatarPath }
    })

    return {
        username: updateAvatar.username,
        avatar: updateAvatar.avatar,
        message: "Avatar upload successful!"
    }
}


const logoutUser = async (usernameToLogOut) => {
    const usernameValidate = validate(getUserValidation, {username: usernameToLogOut})

    const user = await prisma.user.findFirst({
        where: {
            username: usernameValidate.username
        },
        select: {
            username: true,
            name: true
        }
    })
    if (!user) {
        throw new ResponseError(404, "Username Not Found")
    }

    return user
}



export default {
    registration,
    login,
    getUser,
    updateUser,
    logoutUser,
    loginOrRegisterGoogleService,
    uploadAvatarUser
}