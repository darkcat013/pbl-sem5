import { decrypt } from "paseto-ts/v4"
import { localStorageKeys } from "../constants"
import { IToken } from '../interfaces/tokens';
import { decryptToken } from './paseto';

export const setAccessToken = (token: any) => {
    localStorage.setItem(localStorageKeys.accessToken, token);
}

export const setRefreshToken = (token: any) => {
    localStorage.setItem(localStorageKeys.refreshToken, token);
}

export const getAccessToken = () => {
    return localStorage.getItem(localStorageKeys.accessToken)
}

export const getRefreshToken = () => {
    return localStorage.getItem(localStorageKeys.refreshToken)
}

export const hasAccessToken = () => {
    return !!getAccessToken()
}

export const hasRefreshToken = () => {
    return !!getRefreshToken()
}

export const decryptAccessToken = () : IToken => {
    return JSON.parse(JSON.stringify(decryptToken(getAccessToken())))
}

export const decryptRefreshToken = () : IToken => {
    return JSON.parse(JSON.stringify(decryptToken(getRefreshToken())))
}

export const accessTokenExpired = () => {
    const token = decryptAccessToken()
    return new Date(token.expired_at).getTime() < new Date().getTime()
}

export const refreshTokenExpired = () => {
    const token = decryptRefreshToken()
    return new Date(token.expired_at).getTime() < new Date().getTime()
}