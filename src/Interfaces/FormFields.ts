export default interface LoginFields{
    email?: string;
    password?: string;
}
export interface LoginSuccess<T = any>{
    code?: number;
    message?: string;
    status?: string;
    token?: string;
}