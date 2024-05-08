
export interface IUser {
    _id:       string;
    email:     string;
    username:  string;
    verified:  boolean;
    clients:   any[];
    createdAt: Date;
    updatedAt: Date;
}