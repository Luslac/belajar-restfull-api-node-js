import express from "express";
import userController from "../controller/user-controller.js";
import passport from "passport";
const publicRouter = express.Router() 

publicRouter.post("/api/users", userController.register)
publicRouter.post("/api/users/login", userController.login)
publicRouter.get('/api/users/auth/google', passport.authenticate('google', {
        scope: ['email', 'profile'],
        prompt: 'select_account',
        session: false
    }))

publicRouter.get('/api/users/auth/google/callback', passport.authenticate('google', 
    { session: false, failureRedirect: '/login-fail' }), 
    userController.loginGoogle
)
export {
    publicRouter
}