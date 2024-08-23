export default interface ApiResponse<T = any> {
    status?: "success" | "failed";
    message?: string;
    data?: T;
    token?:string;
}
export interface ErrorResponse {
    message: string;
    response?: any;
    errors?:any;
}

export  interface Response<T = any> {
    message?:string;
    response?:T
}


