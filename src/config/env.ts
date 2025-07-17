// call dotenv all value

import dotenv from "dotenv"

dotenv.config()

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production"
    JWT_ACCESS_TOKEN: string
    JWT_ACCESS_EXPIRES: string
    JWT_REFRESH_TOKEN: string
    JWT_REFRESH_EXPIRES: string
    BCRYPT_SALT_ROUND: string
    SUPER_ADMIN_EMAIL: string
    SUPER_ADMIN_PASS: string
    GOOGLE_CLIENT_SECRET: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CALLBACK_URL: string
    EXPRESS_SESSION_SECRET: string
    FRONTENT_URL: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables : string[] = ["PORT", "DB_URL", "NODE_ENV", "JWT_ACCESS_TOKEN", "JWT_ACCESS_EXPIRES", "BCRYPT_SALT_ROUND", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASS", "JWT_REFRESH_TOKEN", "JWT_REFRESH_EXPIRES", "GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CALLBACK_URL", "EXPRESS_SESSION_SECRET", "FRONTENT_URL"]

    requiredEnvVariables.forEach(key => {
        if(!process.env[key]){
            throw new Error (`Missing require environment variable in ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASS : process.env.SUPER_ADMIN_PASS as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        FRONTENT_URL: process.env.FRONTENT_URL as string,
    }
}

export const envVars =  loadEnvVariables();