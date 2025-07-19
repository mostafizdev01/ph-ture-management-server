/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSecure, TGeericErrorResponse } from "../interfaces/errror.types";


export const handlerZodError = (err: any): TGeericErrorResponse => {
    const errorSources : TErrorSecure[]= [];

    err.issues.forEach((issue: any)=> {
        errorSources.push({
            path: issue.path[issue.path.length -1],
            message: issue.message
        })
    })

    return {
        statusCode: 400,
        message: "Zod Error",
        errorSources
    }
}