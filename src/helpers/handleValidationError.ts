/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorSecure, TGeericErrorResponse } from "../interfaces/errror.types";


export const handleValidationError = (err: mongoose.Error.ValidationError): TGeericErrorResponse => {
    const errorSources: TErrorSecure[] = []

    const errors = Object.values(err.errors)

    errors.forEach((errorObject: any) => errorSources.push({
        path: errorObject.path,
        message: errorObject.message
    }))

    return {
        statusCode : 400,
        message: "Validation Error",
        errorSources
    }
}