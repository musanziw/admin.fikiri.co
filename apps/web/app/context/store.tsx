"use client";

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
  } from "react";

  import { Account } from "../utils/types";
  
  interface AuthContextProps {
    account: undefined | null | Account;
    setAccount: Dispatch<SetStateAction<Account | null | undefined>>;
  }
  
  const AuthProvider = createContext<AuthContextProps | undefined>(undefined);
  
  interface ContextProviderProps {
    children: ReactNode;
  }
  
  export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const storedAccount = localStorage.getItem('ACCOUNT');
    
    const [account, _setAccount] = useState<undefined | null | Account>(
      storedAccount ? JSON.parse(storedAccount) : null
    );
  
    const setAccount = (newAccount: Account): void => {
      _setAccount(newAccount);
      if (newAccount) {
        localStorage.setItem("ACCOUNT", JSON.stringify(newAccount));
      } else {
        localStorage.removeItem("ACCOUNT");
      }
    };
  
    return (
      <AuthProvider.Provider value={{ account, setAccount }}>
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
  