/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utilis/sendResponse";
import httpStatus from "http-status-codes"
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utilis/setCookie";



const credentialsLogin = catchAsync(async (req:Request, res:Response, next:NextFunction)=> {
    const loginInfo = await AuthServices.credentialsLogin(req.body)

    setAuthCookie(res, loginInfo);

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo
    })
})

// token controler>>>>>>>>>
const getNewAccessToken = catchAsync(async (req:Request, res:Response, next:NextFunction)=> {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh Token recieved from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)

    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    setAuthCookie(res, tokenInfo)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: tokenInfo
    })
})

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken
}