import { NullTime, NullString } from './sqlc-null-fields';
export interface ITokenUser {
    authenticated: boolean,
    class_id: number,
    email: string,
    id: number,
    role: number[]
    school_id: number,
    user_id: number
}

export interface IUser {
    birthDate: NullTime,
    createdAt: Date,
    domicile: NullString,
    email: string,
    firstName: string,
    gender: string,
    id: number
    lastName: string
    passwordChangedAt: Date
    phoneNumber: NullString
}