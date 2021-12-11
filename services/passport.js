const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const {googleClientID , googleClientSecret} = require ('../config/keys')

passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback'
} , (accessToken , refreshToken , profile  , done) => {
    console.log('Access token' , accessToken);
    console.log('Refresh token' , refreshToken);
    console.log('profile' , profile);


}))