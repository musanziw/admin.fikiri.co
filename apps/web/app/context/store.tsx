"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import axios from "../config/axios";

interface AuthContextProps {
  isLogged: boolean,
  setIsLogged: (isLogged: boolean) => void
}

const AuthProvider = createContext<AuthContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    axios.get("/auth/profile").then(({ data: response }) => {
      return setIsLogged(response.data);
    }).catch(() => {
      setIsLogged(false)
    })
  }, [isLogged])

  return (
    <AuthProvider.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthProvider.Provider>
  );
};

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthProvider);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
