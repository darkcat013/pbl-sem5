import { decrypt } from 'paseto-ts/v4';

export const decryptToken = (token:any) => {
    const { payload } = decrypt(import.meta.env.VITE_PASETO_KEY, token)
    return payload
}