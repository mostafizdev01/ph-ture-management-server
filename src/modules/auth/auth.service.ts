import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { createNewAccessTokenWithRefreshToken, createUserToken } from "../../utilis/userTokens";


const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    const userTokens = createUserToken(isUserExist)

    // delete isUserExist.password // hide user password of security purpas
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: Pass, ...rest } = isUserExist.toObject() // hide user password of security purpas && show data in object format

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }
}

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
    return {
       accessToken: newAccessToken.accessToken
    }
}


export const AuthServices = {
    credentialsLogin,
    getNewAccessToken
}