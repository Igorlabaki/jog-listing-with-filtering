import React, { EventHandler, useEffect, useState } from "react";
import useErrors from "../../hook/useErrors";
import useAuthContext from "../../hook/useAuthContext";
import { AuthLogin, ErrorAuth } from "../../Interfaces";
import { Button } from "../util/Button";
import isEmailValid from "../util/isEmailValid";
import { Session, User } from "@prisma/client";
import axios from "axios";
import { setCookie } from "nookies";
import { v4 as uuidv4 } from "uuid";
import SelectItemsComponent from "../util/selectItems";

export function FormComponent() {
  const { setError, errors, removeError } = useErrors();

  const { setAuthUser, setSession, handleCloseAuthModal } = useAuthContext();
  const [authLogin, setAuthLogin] = useState<AuthLogin>({
    email: "",
    password: "",
    username: "",
  });

  const [userType, setUserType] = useState<string>();
  const [levelType, setLevelType] = useState<string>();
  const [areaType, setAreaType] = useState<string>();

  const [modeAuthModal, setmodeAuthModal] = useState("signIn");

  function handleChange(event: any) {
    const field = event.target.name;
    const value = event.target.value;

    setAuthLogin({ ...authLogin, [field]: value });

    if (!value) {
      setError({ field: field, message: `${field} is required` });
    } else if (field === "email" && !isEmailValid(value)) {
      setError({ field: field, message: `This ${field} is invalid` });
    } else {
      removeError(field);
    }
  }

  async function handleCookies(userId: string) {
    const token = uuidv4();

    const expire = 30 * 24 * 60 * 60;

    setCookie(null, "userToken", token, {
      maxAge: expire,
      path: "/",
    });

    const bodySession = {
      token: token,
      userId: userId,
      expire: new Date(),
    };

    const session: Session = await axios
      .post(`/api/session`, bodySession)
      .then((resp) => resp.data);

    setSession(() => session);
  }

  async function signIn({ email, password }: AuthLogin) {
    try {
      const user: User = await axios
        .get(`/api/auth/${email}`)
        .then((resp) => resp.data);

      const validatePassword = user.password === password;

      if (validatePassword) {
        handleCookies(user.id);
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

  async function signUp(authLogin: AuthLogin) {
    if (!userType) {
      setError({ field: "Type account", message: `Type account is required` });
      setTimeout(() => removeError("Type account"), 2000);
      return;
    }
    if (userType.includes("developer") && !levelType) {
      setError({
        field: "Level",
        message: `Level is required`,
      });
      setTimeout(() => removeError("Level"), 2000);
      return;
    }

    if (userType.includes("developer") && !areaType) {
      setError({
        field: "Area",
        message: `Area is required`,
      });
      setTimeout(() => removeError("Area"), 2000);
      return;
    }

    if (authLogin.password.length < 8) {
      setError({
        field: "Password lenght",
        message: `Password lenght must have at least 8 character`,
      });
      setTimeout(() => removeError("Password lenght"), 2000);
      return;
    }
    try {
      const inputData = {
        ...authLogin,
      };
      const user: User = await axios
        .post(`/api/auth`, inputData)
        .then((resp) => resp.data);
      handleCookies(user.id);
      setAuthUser(() => user);
      handleCloseAuthModal();
    } catch (error) {
      setError({
        field: "Email already exists",
        message: "This email already have an account.",
      });
      setTimeout(() => removeError("Email already exists"), 2000);
    }
  }

  function handleSubmit() {
    if (modeSignIn) {
      signIn(authLogin);
    } else {
      signUp(authLogin);
    }
  }

  const modeSignIn = modeAuthModal.includes("signIn");
  const modeSignUp = modeAuthModal.includes("signUp");

  useEffect(() => {
    setAuthLogin(() => ({
      ...authLogin,
      userType: userType,
      levelType: levelType,
      areaType: areaType,
    }));
  }, [userType, areaType, levelType]);

  return (
    <div className="relative flex flex-col justify-center items-start  w-[50%] md:w-[90%] mx-auto ">
      {modeSignUp ? (
        <div className="w-full ">
          <p className="text-desaturatedDarkCyan text-4xl font-semibold text-center w-full">
            Sign up
          </p>
        </div>
      ) : (
        <div className={`flex flex-col justify-center items-center`}>
          <div className="h-48 w-48">
            <img src="/images/logo/mobilbeGreenLogo.png" alt="" />
          </div>
          <p
            className={`text-sm text-darkGrayishYan font-light w-[80%] mx-auto mt-2 `}
          >
            Welcome to the network that connects developers and employers
          </p>
        </div>
      )}
      {errors.length > 0 && (
        <div
          className={`e
            bg-red-200 flex justify-center items-start 
            rounded-lg text-[12px] italic font-semibold text-red-600 my-4 py-1 px-3
            animate-openMenu flex-col space-x-2 w-full
            `}
        >
          <p>Please correct the error(s) below:</p>
          {errors.map((error: ErrorAuth, index: number) => {
            return <p key={index}>- {error.message}</p>;
          })}
        </div>
      )}
      <div
        className={`flex flex-col space-y-3 h-auto w-full  ${
          errors.length > 0 ? "mt-3" : "mt-10"
        }`}
      >
        <input
          required
          type="email"
          name="email"
          className={`${
            errors.find((item) => item.field.toLocaleLowerCase() === "email") &&
            "border-2 border-red-300"
          }
            outline-none border-0 bg-LightGrayishCyan shadow-lg h-8 rounded-lg w-full px-3 py-1
          `}
          placeholder="Enter your email"
          value={authLogin.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          required
          type="text"
          name="username"
          className={`${modeSignUp ? "flex" : "hidden"} ${
            errors.find(
              (item) => item.field.toLocaleLowerCase() === "username"
            ) && "border-2 border-red-300"
          }
            outline-none border-0 bg-LightGrayishCyan shadow-lg h-8 rounded-lg w-full px-3 py-1 overflow-hidden
          `}
          placeholder="Enter your username"
          value={authLogin.username}
          onChange={(e) => handleChange(e)}
        />
        <input
          required
          type="password"
          name="password"
          className={`${
            errors.find(
              (item) => item.field.toLocaleLowerCase() === "password"
            ) && "border-2 border-red-300"
          }
          outline-none border-0 bg-LightGrayishCyan shadow-lg h-8 rounded-lg w-full px-3 py-1`}
          placeholder="Enter your password"
          value={authLogin.password}
          onChange={(e) => handleChange(e)}
        />
        <SelectItemsComponent
          title="Type account"
          type={userType}
          setType={setUserType}
          listOptions={["developer", "company"]}
          handleHidden={modeSignUp}
        />
        <SelectItemsComponent
          title="Select your level"
          type={levelType}
          setType={setLevelType}
          listOptions={["Intern", "Junior", "Middle", "Senior", "Specialist"]}
          handleHidden={modeSignUp && userType?.includes("developer")}
        />
        <SelectItemsComponent
          title="Select your area"
          type={areaType}
          setType={setAreaType}
          listOptions={["Frontend", "Backend", "FullStack"]}
          handleHidden={modeSignUp && userType?.includes("developer")}
        />
      </div>
      <div className="mb-3">
        <div className="flex space-x-1 my-2">
          <p className="text-[13px]  font-[600] text-veryDarkGraishCyan pl-1">
            {modeSignIn
              ? "Are you new here?"
              : "Do you already have an account?"}
          </p>
          <Button
            onClick={() => {
              if (modeSignIn) {
                setmodeAuthModal("signUp");
                errors.splice(0, errors.length);
              } else {
                setmodeAuthModal("signIn");
                errors.splice(0, errors.length);
              }
            }}
            type="button"
            title={modeSignUp ? "Sign in" : "Sign up"}
            className="text-[13px] font-semibold text-desaturatedDarkCyan animate-pulse hover:font-bold"
          />
        </div>
      </div>
      <Button
        type="submit"
        title="Confirm"
        disabled={errors.length > 0 ? true : false}
        className={`
          w-[100%] bg-desaturatedDarkCyan shadow-pattern cursor-pointer
          hover:shadow-none hover:brightness-110  text-white text-[1.1rem] 
            flex justify-center items-center rounded-lg space-x-2 p-2`}
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      />
    </div>
  );
}
