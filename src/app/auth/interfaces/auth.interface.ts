import { IUser } from "./user.interface";

export interface Ilogin {
    email: string;
    password: string;
}

export interface IAuth {
    user:  IUser;
    token: string;
    message?: string;
}

export enum AuthStatus {
    checking = 'checking',
    authenticated = 'authenticated',
    notAuthenticated = 'notAuthenticated',
}