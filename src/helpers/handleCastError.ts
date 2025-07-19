/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { TGeericErrorResponse } from "../interfaces/errror.types";


export const handleCastError = (err: mongoose.Error.CastError): TGeericErrorResponse => {
    return {
        statusCode: 400,
        message: "Invalid MongoDB ObjectID. Please provide a valid id"
    }
}