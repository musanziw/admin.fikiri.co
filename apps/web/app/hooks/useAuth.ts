import { Account } from "../utils/types";
import { useAuthContext } from "../context/store";
import { useCallback } from "react";
import axios from "../api/axios";

export enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Guest = 2,
}

export function useAuth() {
  const { account, setAccount } = useAuthContext();

  let status = AuthStatus.Unknown;

  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  const authenticate = useCallback(async () => {
    try {
      const response = await axios.get("/solutions", {
        withCredentials: true,
      });
      const data = response.data.data;

      setAccount(data);
    } catch (error) {
      setAccount(null);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login",{email, password}, {
        withCredentials: true,
      });
      const data = response.data.data;

      setAccount(data);
    } catch (error) {
      setAccount(null);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await axios.get("/auth/login", {
        withCredentials: true,
      });
      const data = response.data.data;

      setAccount(data);
    } catch (error) {
      setAccount(null);
    }
  }, []);

  return {
    account,
    status,
    authenticate,
    login,
    logout
  };
}
