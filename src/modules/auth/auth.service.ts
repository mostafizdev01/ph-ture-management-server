import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import Jwt  from "jsonwebtoken";


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

    const accessToken = Jwt.sign(jwtPayload, "secret", {expiresIn: "1d"})

    return {
        accessToken
    }
}


export const AuthServices = {
    credentialsLogin
}