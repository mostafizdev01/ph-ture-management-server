/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import {Strategy as GoogleStrategy, Profile, VerifyCallback} from "passport-google-oauth20"
import {Strategy as LocalStrategy} from "passport-local";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import bcryptjs from 'bcryptjs';


// LOGIN WITH CREDENTIAL FUNCTIONALITY
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email: string, password: string, done: any)=>{
    try {
        const isUserExist = await User.findOne({email})

        if(!isUserExist){
            return done("User does not exits")
        }

       const isGoogleAuthenticated = isUserExist.auths.some(providerObjects => providerObjects.provider === "google") // Not Understand this line
       
       if(isGoogleAuthenticated && !isUserExist.password){
        return done(null, false, {message: "you are google authenticated. Please set password then try agin."})
       }

       const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string)

       if(!isPasswordMatch){
        return done(null, false, {message: "Password does not match"})
       }

       return done(null, isUserExist)
    } catch (error) {
        done(error)
    }
}))

// LOGIN WITH GOOGLE STRATEGY
passport.use(
    new GoogleStrategy (
     {
        clientID : envVars.GOOGLE_CLIENT_ID,
        clientSecret: envVars.GOOGLE_CLIENT_SECRET,
        callbackURL: envVars.GOOGLE_CALLBACK_URL
     }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        try{
           const email = profile.emails?.[0].value;

           if(!email){
            return done(null, false, {message: "No email found"})
           }
           let user = await User.findOne({email})

           if(!user){
            user = await User.create({
                email,
                name: profile.displayName,
                picture: profile.photos?.[0].value,
                role: Role.USER,
                isVerified: true,
                auths: [
                    {
                        provider: "google",
                        providerId: profile.id
                    }
                ]
            })
           }
           return done(null, user)
        }catch(err){
          console.log("Google strategy Error", err);
          return done(err)
        }
     }
    )
)

passport.serializeUser((user: any, done:(err: any, id?: unknown)=>void) => {
    done(null, user._id)
})

passport.deserializeUser(async(id: string, done: any)=>{
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
      done(error)
    }
})