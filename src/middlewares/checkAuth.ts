/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utilis/jwt";
import { envVars } from "../config/env";
import { isActive, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import httpStatus from "http-status-codes"


export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token Recieved")
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_TOKEN) as JwtPayload

        const isUserExist = await User.findOne({ email: verifiedToken.email })

        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
        }

        if (isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
        }

        if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is deleted`)
        }

        if (!authRoles.includes(verifiedToken.role)) {
            res.send({ message: "You are not Permitted to view this route!!!" })
            throw new AppError(403, "You are not Permitted to view this route!!!")
        }

        req.user = verifiedToken
        next()

    } catch (err) {
        res.status(403).send(err)
    }
}