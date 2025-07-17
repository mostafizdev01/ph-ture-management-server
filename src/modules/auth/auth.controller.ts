/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utilis/sendResponse";
import httpStatus from "http-status-codes"
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utilis/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../../utilis/userTokens";
import { envVars } from "../../config/env";



const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body)

    setAuthCookie(res, loginInfo);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo
    })
})

// token controler>>>>>>>>>
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh Token recieved from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)

    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token Retrived Successfully ✅",
        data: tokenInfo
    })
})

// logout controler>>>>>>>>>
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged Out Successfully",
        data: null
    })
})

// resetPassword controler>>>>>>>>>
const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;
    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null
    })
})

// Google logi controler>>>>>>>>>
const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
    let redirectTo = req.query.state ? req.query.state as string : ""

    if(redirectTo.startsWith("/")){
        redirectTo = redirectTo.slice(1)
    }

    const user = req.user;

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User Not found")
    }

    const userToken = createUserToken(user)

    setAuthCookie(res, userToken)

    res.redirect(`${envVars.FRONTENT_URL}/${redirectTo}`)

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: null
    // })
})

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
}