import { localStorageKeys } from "../constants"
import { ITokenUser } from "../interfaces/user"
import { decryptToken } from './paseto';


export const userInRole = (role: number): boolean => {
    const roles = getTokenUser().role
    if(!roles) return false
    return roles.includes(role)
}

export const getTokenUser = () : ITokenUser => {
    const token = localStorage.getItem(localStorageKeys.accessToken)
    if(!token) return null
    const decryptedToken = decryptToken(token)
    return JSON.parse(JSON.stringify(decryptedToken))
}

export const userAuthenticated = () : boolean => {
    return getTokenUser()?.authenticated
}