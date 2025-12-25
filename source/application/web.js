// FOR EXPRESS
import express from "express";
import { publicRouter } from "../router/publicAPI.js";
import { errorMiddleWare } from "../middleware/error-middleware.js";

export const web = express()
web.use(express.json())
web.use(publicRouter)
web.use(errorMiddleWare)