// FOR EXPRESS
import express from "express";
import passport from "passport";
import session from "express-session";
import { publicRouter } from "../router/publicAPI.js";
import { errorMiddleWare } from "../middleware/error-middleware.js";
import { userRouter } from "../router/api.js";
import "../middleware/oatuh-google-middleware.js";
export const web = express()

web.use(session({
    secret: "dokja_my_broder",
    resave: false,
    session: true,
    saveUninitialized: false
}))
web.use(passport.initialize())
//web.use(passport.session())
web.use(express.json())
web.use("/images", express.static("public/images"));
web.use(publicRouter)
web.use(userRouter)
web.use(errorMiddleWare)