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
  isLogged: boolean;
  token: string | null;
  storeToken: (token: string | null) => void;
  setIsLogged: (isLogged: boolean) => void;
  account: any,
  storeAccount: (account: any) => void,
}

const AuthProvider = createContext<AuthContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [account, setAccount] = useState<any>(
    typeof window !== "undefined" ? localStorage.getItem("account") : null
  );
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  )

  const storeToken = (token: string | null) => {
    if (typeof window !== "undefined") {
      setToken(token);
      if (token === null) localStorage.removeItem("token");
      else localStorage.setItem("token", token);
    }
  };

  const storeAccount = (account: any) => {
    if (typeof window !== "undefined") {
      setAccount(account);
      if (account === null) localStorage.removeItem("account");
      else localStorage.setItem("account", JSON.stringify(account));
    }
  };

  useEffect(() => {
    (() => {
      axios.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(({ data: response }) => {
        storeAccount({ email: response.data.email, name: response.data.name, id: response.data.id })
        setIsLogged(response.data);
      }).catch(() => {
        setIsLogged(false)
      })
    })()
  }, [isLogged, token])

  return (
    <AuthProvider.Provider value={{
      isLogged,
      setIsLogged,
      storeToken,
      token,
      account,
      storeAccount
    }}>
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
