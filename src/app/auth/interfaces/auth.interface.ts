export interface Ilogin {
    email: string;
    password: string;
}

export interface IAuth {
    user:  IUser;
    token: string;
    message?: string;
}

export interface IUser {
    _id:       string;
    email:     string;
    username:  string;
    verified:  boolean;
    clients:   any[];
    createdAt: Date;
    updatedAt: Date;
}