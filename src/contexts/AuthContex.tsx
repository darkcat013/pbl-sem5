import React from "react"
import { createAuthStore } from '../stores/authStore';
import { useLocalObservable } from "mobx-react";

const AuthContext = React.createContext(null)

export const AuthProvider = ({children}) => {
    const authStore = useLocalObservable(createAuthStore)

    return <AuthContext.Provider value={authStore}>
        {children}
    </AuthContext.Provider>
}

export const useAuthStore = () => React.useContext(AuthContext)