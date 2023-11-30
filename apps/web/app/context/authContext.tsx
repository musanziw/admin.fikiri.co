"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import axios from "../config/axios";
import { useSession } from "next-auth/react";

interface AuthContextProps {
  isLogged: boolean;
  token: string | null;
  storeToken: (token: string | null) => void;
  setIsLogged: (isLogged: boolean) => void;
  setIsClicked: (isClicked: boolean) => void;
  handleClicked: () => any;
  isClicked: boolean;
  data: any,
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
  const { status, data } = useSession()
  const LOGIN_URI_WITH_GOOGLE = "/auth/login-with-google";

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


  const handleClicked = () => setIsClicked(!isClicked);

  useEffect(() => {
    if (status === 'authenticated') {
      const payload = {
        email: data.user?.email
      }
      axios.post(LOGIN_URI_WITH_GOOGLE, JSON.stringify(payload))
        .then(({ data: res }) => {
          setIsLogged(true);
          setToken(res.data.accessToken)
          setAccount({ email: res.data.email, name: res.data.name })
        }).catch(() => {
          setIsLogged(false)
        })
    }

    axios.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data: response }) => {
      setIsLogged(true);
    }).catch(() => {
      setIsLogged(false)
    })
  }, [isLogged, token, data, status])

  return (
    <AuthProvider.Provider
      value={{
        isLogged,
        setIsLogged,
        storeToken,
        token,
        handleClicked,
        isClicked,
        setIsClicked,
        data,
        account,
        storeAccount
      }}
    >
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
