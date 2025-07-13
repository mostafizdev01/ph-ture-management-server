import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilis/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utilis/sendResponse";
import httpStatus from "http-status-codes"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async (req:Request, res:Response, next:NextFunction)=> {
    const loginInfo = await AuthServices.credentialsLogin(req.body)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo
    })
})

export const AuthControllers = {
    credentialsLogin
}