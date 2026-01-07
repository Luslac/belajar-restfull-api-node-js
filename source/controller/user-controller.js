import { ResponseError } from "../error/response-error.js";
import userService from "../service/user-service.js";
import jwt from "jsonwebtoken"
const register = async (req, res, next) => {
    try {
        const result = await userService.registration(req.body)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const loginGoogle = async (req, res, next) => {
    try {
        const user = req.user
        const token = jwt.sign(
            { email: user.email, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )
        res.redirect(`http://localhost:5000/api/users/current?token=${token}`)
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const requestUserName = req.user.username
        const result = await userService.getUser(requestUserName)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const username = req.user.username
        const request = req.body
        request.username = username

        const result = await userService.updateUser(request)
        res.status(200).json({
            data: result
        })

    } catch (error) {
        next(error)
    }
}

const uploadAvatar = async (req, res, next) => {
    try {
        const result = await userService.uploadAvatarUser(req.user, req.file)

        res.status(200).json({
                data: result 
            })
    } catch (error) {
        next(error)
    }
}


const logOut = async (req, res, next) => {
    try {
        const username = req.user.username
        const result = await userService.logoutUser(username)
        res.status(200).json({
            data: 'OK',
            details: result
        })
    } catch (error) {
        next(error)
    }
}
export default {
    register,
    login,
    get,
    update,
    logOut,
    loginGoogle,
    uploadAvatar
}