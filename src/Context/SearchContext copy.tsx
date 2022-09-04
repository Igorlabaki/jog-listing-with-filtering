import { createContext, Dispatch, ReactNode, useState } from "react";
import { User } from "../Interfaces";
import { users } from "../database/users";

interface AuthContextProvider {
  children: ReactNode;
}
interface AuthContext {
  auth?: User;
  login?: (email: string, password: string) => void;
  logout?: (email: string, password: string) => void;
}

const initialState: AuthContext = {};

export const AuthContext = createContext<AuthContext>(initialState);

export function AuthContextProvider({ children }: AuthContextProvider) {
  const [auth, setAuth] = useState<any>([]);
  const [error, setError] = useState<any>([]);

  function login(email: string, password: string) {
    const user = users.find((user) => {
      user.password === password && user.email;
    });
  }

  function logout(email: string, password: string) {
    const user = users.find((user) => {
      user.password === password && user.email;
    });
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
