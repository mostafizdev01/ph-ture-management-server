/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshToken } from "../../utilis/userTokens";



const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
    return {
       accessToken: newAccessToken.accessToken
    }
}

// resetPassword

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {
     
    const user = await User.findById(decodedToken.userId)

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)

    if(!isOldPasswordMatch){
        throw new AppError(httpStatus.BAD_GATEWAY, "Old Password does not match")
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save();

}


export const AuthServices = {
    getNewAccessToken,
    resetPassword
}