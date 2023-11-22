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
  setAccount: Dispatch<SetStateAction<undefined | null | Account>>;
}

const AuthProvider = createContext<AuthContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [account, setAccount] = useState<undefined | null | Account>({
    id: 1,
    username: "moses",
  });

  return (
    <AuthProvider.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export const useAuthContext = (): AuthContextProps | undefined =>
  useContext(AuthProvider);
