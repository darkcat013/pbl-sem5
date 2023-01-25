import React from "react"
import { createUserStore } from '../stores/userStore';
import { useLocalObservable } from "mobx-react";

const UserContext = React.createContext(null)

export const UserProvider = ({ children }) => {
  const userStore = useLocalObservable(createUserStore)

  return <UserContext.Provider value={userStore}>
    {children}
  </UserContext.Provider>
}

export const useUserStore = () => React.useContext(UserContext)