/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response} from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utilis/jwt";
import { envVars } from "../config/env";
import { Role } from "../modules/user/user.interface";


export const checkAuth = (...authRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token Recieved")
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_TOKEN) as JwtPayload

        if (!authRoles.includes(verifiedToken.role)) {
            res.send({message: "You are not Permitted to view this route!!!"})
            throw new AppError(403, "You are not Permitted to view this route!!!")
        }
        req.user = verifiedToken
        next()

    } catch (err) {
        res.status(403).send(err)
    }
}