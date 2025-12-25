import { ZodError } from "zod"
import { ResponseError } from "../error/response-error.js"


const errorMiddleWare = async (err, req, res, next) => {
    if (!err) {
        next()
        return
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end()
    } else if (err instanceof ZodError) {
        res.status(400).json({
            errors: "Validation Error",
            details: err.flatten().fieldErrors
        }).end()
    } else {
        console.log("INTERNAL ERROR", err)
        res.status(500).json({
            errors: err.message
        }).end()
    }
}

export {
    errorMiddleWare
}
