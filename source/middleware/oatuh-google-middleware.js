import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import userService from '../service/user-service.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/users/auth/google/callback",
    passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile, done) {
    try {
        const user = await userService.loginOrRegisterGoogleService(profile)
        return done(null, user);

    } catch (error) {
        return done(error, null);
    }
    }
))

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));