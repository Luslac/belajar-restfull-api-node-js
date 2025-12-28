import userService from "../service/user-service.js";

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
    logOut
}