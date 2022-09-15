import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AuthLogin } from "../Interfaces";
import Router, { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import useErrors from "../hook/useErrors";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Session, User } from "@prisma/client";

interface AuthContextProvider {
  children: ReactNode;
}
interface AuthContextProps {
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  alertAuth: boolean;
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
  handleOpenAuthModal: () => void;
  handleCloseAuthModal: () => void;
  setAlertAuth: (value: React.SetStateAction<boolean>) => void;
  recoverUserInformation: any;
  setAuthUser: any;
  authUser: any;
  signIn: (authLogin: AuthLogin) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProvider) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [alertAuth, setAlertAuth] = useState(Boolean);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const isAuthenticated = !!authUser;
  const router = useRouter();
  const { setError, errors, removeError } = useErrors();

  function handleOpenAuthModal() {
    setIsAuthModalOpen(() => true);
  }

  function handleCloseAuthModal() {
    setIsAuthModalOpen(() => false);
  }

  async function signIn({ email, password }: AuthLogin) {
    try {
      const user: User = await axios
        .get(`/api/auth/${email}`)
        .then((resp) => resp.data);

      const validatePassword = user.password === password;

      const expire = 30 * 24 * 60 * 60;

      if (validatePassword) {
        const token = uuidv4();

        setCookie(null, "userToken", token, {
          maxAge: expire,
          path: "/",
        });

        const bodySession = {
          token: token,
          userId: user.id,
          expire: new Date(),
        };

        const session: Session = await axios
          .post(`/api/session`, bodySession)
          .then((resp) => resp.data);

        setSession(() => session);
        setAuthUser(() => user);
        handleCloseAuthModal();
      } else {
        setError({
          field: "Wrong password!",
          message: `Email or password are incorrect.`,
        });
        setTimeout(() => removeError("Wrong password!"), 2000);
      }
    } catch (error) {
      setError({
        field: "Email not found",
        message: `${email} is not registered.`,
      });
      setTimeout(() => removeError("Email not found"), 2000);
    }
  }

  async function recoverUserInformation(token: string) {
    try {
      const sessionBody = {
        token: token,
      };
      const sessionUpdate: Session = await axios
        .put(`/api/session`, sessionBody)
        .then((resp) => resp.data);

      setSession(() => sessionUpdate);

      if (sessionUpdate.userId) {
        const user: User = await axios
          .get(`/api/auth/getAuthById/${sessionUpdate.userId}`)
          .then((resp) => resp.data);

        setAuthUser(() => user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const { userToken: token } = parseCookies();

    if (token) {
      recoverUserInformation(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authUser,
        signIn,
        alertAuth,
        setAlertAuth,
        handleCloseAuthModal,
        handleOpenAuthModal,
        recoverUserInformation,
        isAuthModalOpen,
        setAuthUser,
        session,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
