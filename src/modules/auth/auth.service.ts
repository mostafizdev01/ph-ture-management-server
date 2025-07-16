import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { generateToken } from "../../utilis/jwt";
import { envVars } from "../../config/env";


const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({email})

    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string)

    if(!isPasswordMatch){
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_TOKEN, envVars.JWT_ACCESS_EXPIRES)
    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_TOKEN, envVars.JWT_REFRESH_EXPIRES)

    // delete isUserExist.password // hide user password of security purpas
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password: Pass, ...rest} = isUserExist.toObject() // hide user password of security purpas && show data in object format

    return {
        accessToken,
        refreshToken,
        user: rest
    }
}


export const AuthServices = {
    credentialsLogin
}