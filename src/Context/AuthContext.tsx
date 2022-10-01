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
import { Company, Session, User } from "@prisma/client";

interface AuthContextProvider {
  children: ReactNode;
}
interface AuthContextProps {
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  alertAuth: boolean;
  session: Session | null;
  inputUser: any;
  setInputUser: any;
  setSession: Dispatch<SetStateAction<Session | null>>;
  handleOpenAuthModal: () => void;
  handleCloseAuthModal: () => void;
  setAlertAuth: (value: React.SetStateAction<boolean>) => void;
  recoverUserInformation: any;
  setAuthUser: any;
  authUser: any;
  signIn: (authLogin: AuthLogin) => Promise<void>;
  avatar: any;
  setAvatar: any;
  uploadPhoto: any;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProvider) {
  const [authUser, setAuthUser] = useState<User | Company | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [alertAuth, setAlertAuth] = useState(Boolean);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [inputUser, setInputUser] = useState<User | null>();

  const [avatar, setAvatar] = useState<string | undefined | null>();

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

  async function uploadPhoto(file: any) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", "972746539144337");
    formData.append("api_secret", "-odjGAqU-hd76JQeZUCHx5tbC8Y");
    formData.append("upload_preset", "onbridge");

    const photoUpload = await fetch(
      "https:api.cloudinary.com/v1_1/dcjkvwbvh/image/upload",
      {
        method: "post",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        const bodyReq = {
          avatar: data.url,
          email: authUser?.email,
        };

        if (authUser?.userType?.includes("developer")) {
          const userUpdate = await axios
            .put("/api/user", bodyReq)
            .then((resp) => resp.data);
        } else {
          const companyrUpdated = await axios
            .put("/api/company", bodyReq)
            .then((resp) => resp.data);
        }

        // await axios
        //   .put("https://api.cloudinary.com/v1_1/dcjkvwbvh/image/upload", formData)
        //   .then((resp) => console.log(resp.data));
      });
  }

  async function recoverUserInformation(token: string, userType: string) {
    try {
      const sessionBody = {
        token: token,
        userType: userType,
      };
      const sessionUpdate: Session = await axios
        .put(`/api/session`, sessionBody)
        .then((resp) => resp.data);

      setSession(() => sessionUpdate);

      if (userType.includes("developer")) {
        if (sessionUpdate.userId) {
          const user: User = await axios
            .get(`/api/auth/getAuthById/${sessionUpdate.userId}`)
            .then((resp) => resp.data);
          setAuthUser(() => user);
        }
      } else if (userType.includes("company")) {
        if (sessionUpdate.companyId) {
          const user: Company = await axios
            .get(`/api/company/getCompanyById/${sessionUpdate.companyId}`)
            .then((resp) => resp.data);

          setAuthUser(() => user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const { userToken: uToken, companyToken: cToken } = parseCookies();
    if (uToken) {
      recoverUserInformation(uToken, "developer");
    } else if (cToken) {
      recoverUserInformation(cToken, "company");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        inputUser,
        setInputUser,
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
        avatar,
        setAvatar,
        uploadPhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
