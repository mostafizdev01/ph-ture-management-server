/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import { catchAsync } from "../../utilis/catchAsync";
import { sendResponse } from "../../utilis/sendResponse";
// import AppError from "../../errorHelpers/AppError";            



// const createUser = async (req: Request, res: Response, next:NextFunction) => {
//     try {
//         // throw new AppError(httpStatus.BAD_REQUEST, "fake error")
//         const user = await UserServices.createUser(req.body)
//         res.status(httpStatus.CREATED).json({
//             message: " ✅ User Created Successfully",
//             user
//         })
//     }
//     catch (err: any) {
//         next(err)
//     }
// }


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)

    // res.status(httpStatus.CREATED).json({
    //     message: " ✅ User Created Successfully",
    //     user
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user
    })

})

// updated user >>>>>>>>>>>

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_TOKEN) as JwtPayload
    const verifiedToken = req.user;
    const payload = req.body;

    const user = await UserServices.updateUser(userId, payload, verifiedToken)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully ✅",
        data: user
    })

})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const results = await UserServices.getAllUsers();

    // res.status(httpStatus.OK).json({
    //     message: " ✅ All Users Retrieved Successfully",
    //     data: users
    // })

        sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Users Retrieved Successfully",
        data: results.data,
        meta: results.meta
    })
})


export const UserControllers = {
    createUser, getAllUsers, updateUser
}