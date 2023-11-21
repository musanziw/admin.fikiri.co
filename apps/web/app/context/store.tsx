"use client";

import React, { createContext, useContext, Dispatch, useState, ReactNode } from "react";

interface AuthContextProps {
  user: string; 
}

const AuthProvider = createContext<AuthContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string>("Moses kalunga");

  return (
    <AuthProvider.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export const useAuthContext = (): AuthContextProps | undefined => useContext(AuthProvider);
