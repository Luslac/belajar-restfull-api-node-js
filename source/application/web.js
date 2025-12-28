// FOR EXPRESS
import express from "express";
import { publicRouter } from "../router/publicAPI.js";
import { errorMiddleWare } from "../middleware/error-middleware.js";
import { userRouter } from "../router/api.js";

export const web = express()
web.use(express.json())
web.use(publicRouter)
web.use(userRouter)
web.use(errorMiddleWare)