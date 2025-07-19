import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import { TErrorSecure } from "../interfaces/errror.types";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handlerZodError } from "../helpers/handleZodError";
import { handleValidationError } from "../helpers/handleValidationError";
import AppError from "../errorHelpers/AppError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if(envVars.NODE_ENV === "development"){
        console.log(err);
    }

    let errorSources: TErrorSecure[] = []
    let statusCode = 500
    let message = `Something Went Wrong!!`

    // Duplicate Error handaling
    if(err.code === 1000){
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
    }

    // ObjectId Error castError handeling
    if(err.name === "CastError"){
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
    }

    // ZodError handeling
    if(err.name === "ZodError"){
        const simplifiedError = handlerZodError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources as TErrorSecure[]
    }

    // Validation error handeling
    if(err.name === "ValidationError"){
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources as TErrorSecure[]
    }
    else if(err instanceof AppError){
        statusCode = err.statusCode
        message = err.message
    }else if(err instanceof Error){
        res.status(statusCode).json({
            success: false,
            message,
            errorSources,
            err: envVars.NODE_ENV==="development"? err : null,
            stack: envVars.NODE_ENV === "development" ? err.stack : null
        })
    }
}