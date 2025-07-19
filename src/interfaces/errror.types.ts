
export interface TErrorSecure {
    path: string,
    message: string
}

export interface TGeericErrorResponse {
    statusCode: number, 
    message: string, 
    errorSources? : TErrorSecure[]
}