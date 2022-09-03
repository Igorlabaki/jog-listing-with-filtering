import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LayoutComponent } from "../../Components/util/layout";
import useuserContext from "../../hook/useJobContext";
import useUserContext from "../../hook/useUserContext";

export default function JobId() {
  const {
    query: { userId },
  } = useRouter();

  const { user, selectUserById } = useUserContext();

  useEffect(() => selectUserById(userId?.toString()), []);

  return (
    <LayoutComponent>
      <div className="flex justify-center md:justify-start flex-col md:flex-row md:mr-4 w-[100%] py-5 px-3 rounded-md shadow-pattern md:gap-4 bg-white mt-5">
        <div className="flex md:flex-col justify-between md:justify-start md:space-y-3 items-center">
          <div className="w-[100px] h-[100px] mr-2 rounded-full shadow-sm">
            <img src={user?.avatar} alt="" className="h-full w-full" />
          </div>
          <button className="bg-desaturatedDarkCyan text-white font-bold py-1 px-2 rounded-lg shadow-lg hover:shadow-none hover:brightness-105">
            Contact
          </button>
        </div>
        <div className="md:w-[70%] mt-4 md:[mt-0]">
          <div className="flex justify-between">
            <h2 className="text-justify font-bold text-3xl text-desaturatedDarkCyan">
              {user?.name}
            </h2>
          </div>
          <h3 className="text-justify  font-semibold text-2xl text-black">
            {user?.levels} {user?.areas}
          </h3>
          <div className="flex space-x-1 text-[12px] font-semibold text-gray-500">
            <p>{`${user?.email}`}</p>
          </div>
          <p className="text-justify text-sm mt-4 font-semibold">Bio:</p>
          <p className="text-justify text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste
            sapiente, commodi, nobis animi, vitae perferendis eligendi optio
            culpa consequatur aspernatur dolorum quibusdam provident dolor
            similique. Voluptatem dignissimos minus earum?
          </p>
          <hr className="h-3 my-2" />
          <div className="flex justify-start items-center text-[12px] gap-x-2 text-desaturatedDarkCyan font-bold flex-wrap gap-y-2">
            <p>Skills :</p>
            {user?.skills?.map((skill, i) => {
              return (
                <div key={i}>
                  <p
                    className={` min-w-[70px] min-h-[30px]  p-1 shadow-md rounded-sm bg-desaturatedDarkCyan text-white cursor-pointer max-w-[100px] flex-wrap`}
                    onClick={() => {}}
                  >
                    {skill}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
