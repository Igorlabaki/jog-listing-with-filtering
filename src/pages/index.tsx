import type { NextPage } from "next";
import { LayoutComponent } from "../Components/util/layout";
import { SearchComponent } from "../Components/search";
import { JobsComponent } from "../Components/jobs";
import UsersComponent from "../Components/users";
import { useState } from "react";
import { propsAuthModal } from "../Components/modals/authModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dynamic from "next/dynamic";
import { IoIosClose } from "react-icons/io";
import { Button } from "../Components/util/Button";

const Home: NextPage = () => {
  const [mode, setMode] = useState("jobs");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  function handleOpenAuthModal() {
    setIsAuthModalOpen(() => true);
  }

  function handleCloseAuthModal() {
    setIsAuthModalOpen(() => false);
  }

  const ModalAuthComponent = dynamic<propsAuthModal>(() => {
    return import("../Components/modals/authModal").then(
      (comp) => comp.ModalAuthComponent
    );
  });

  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email is required")
        .email("This is not a valid email"),
      username: yup.string().required("Username is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters.")
        .max(12, "Password limit chars is 12"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onLogin = (data: any) => console.log(data);
  const onRegister = (data: any) => console.log(data);
  console.log(errors);

  return (
    <LayoutComponent>
      <div className="absolute top-9 right-[5%] cursor-pointer">
        <p
          className="text-white text-md font-semibold z-30"
          onClick={() => handleOpenAuthModal()}
        >
          Sing In
        </p>
      </div>
      <SearchComponent />
      <div className="flex gap-x-3 mt-3">
        <button
          onClick={() => setMode("jobs")}
          className="min-w-[100px] bg-desaturatedDarkCyan py-1 px-2 text-white font-bold text-md rounded-md"
        >
          Jobs
        </button>
        <button
          onClick={() => {
            setMode("developers");
          }}
          className="min-w-[100px] bg-desaturatedDarkCyan py-1 px-2 text-white font-bold text-md rounded-md"
        >
          Developers
        </button>
      </div>
      {mode.includes("jobs") ? <JobsComponent /> : <UsersComponent />}
      {isAuthModalOpen ? (
        <ModalAuthComponent onClose={() => handleCloseAuthModal()}>
          <div className="bg-white flex justify-center items-center flex-col py-5 px-3 relative h-full w-full">
            <div className="absolute top-2 right-2 hover:bg-LightGrayishCyan rounded-full">
              <IoIosClose
                size={25}
                className={"text-desaturatedDarkCyan cursor-pointer"}
                onClick={() => handleCloseAuthModal()}
              />
            </div>
            <p className="font-bold text-desaturatedDarkCyan text-4xl">
              Sign in
            </p>
            <form onSubmit={handleSubmit(onLogin)} className={"w-[80%]"}>
              {errors?.email || errors?.password ? (
                <div>
                  <p>{}</p>
                  <p>{}</p>
                </div>
              ) : null}
              <div className="space-y-3">
                <div className="flex flex-col mt-10 ">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    {...register("email")}
                    className={`${
                      errors.email ? "border-error" : null
                    } outline-none shadow-md focus:bg-LightGrayishCyan  p-2 rounded-md bg-white`}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Enter your password..."
                    {...register("password")}
                    className={`${errors.password ? "border-error" : null} 
                    outline-none focus:bg-LightGrayishCyan p-2 rounded-md bg-bg-gray w-[100%] shadow-lg border-1`}
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="flex space-x-1 my-2">
                  <p className="text-[13px]  font-semibold text-veryDarkGraishCyan">
                    Are you new here?
                  </p>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    title="Sign up."
                    className="text-[13px] font-semibold text-desaturatedDarkCyan animate-pulse hover:font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  type="submit"
                  title="Confirm"
                  disabled={errors ? true : false}
                  className={`
                    w-[100%] bg-desaturatedDarkCyan shadow-pattern cursor-pointer
                    hover:shadow-none hover:brightness-110  text-white text-[1.1rem] 
                    font-semibold  flex justify-center items-center rounded-lg space-x-2 p-2`}
                />
              </div>
            </form>
          </div>
        </ModalAuthComponent>
      ) : null}
    </LayoutComponent>
  );
};

export default Home;
