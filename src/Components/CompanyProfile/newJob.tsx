import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "../util/Button";
import { IoIosClose } from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";
import SelectItemsComponent from "../util/selectItems";
import useAuthContext from "../../hook/useAuthContext";
import { CountryListComponent } from "../util/countryList";
import useJobContext from "../../hook/useJobContext";
import useErrors from "../../hook/useErrors";
import { ErrorAuth } from "../../Interfaces";
import { Skill } from "@prisma/client";

interface Props {
  handleCloseJobModal: any;
  job?: any;
}

export function NewJobComponentModal({ handleCloseJobModal, job }: Props) {
  const { authUser } = useAuthContext();
  const { createJob } = useJobContext();
  const { errors, removeError, setError, setErrors } = useErrors();

  const [period, setPeriod] = useState<any>(job?.period?.name || "");
  const [aboutJob, setAboutJob] = useState<any>(job?.about || "");
  const [levelType, setLevelType] = useState<string | undefined | null>(
    job?.level?.name || ""
  );
  const [areaType, setAreaType] = useState<string | undefined | null>(
    job?.area?.name || ""
  );
  const [skillsList, setSkillsList] = useState<string[]>(
    job?.Skills?.map((item: any) => item?.skill?.text) || []
  );
  const [country, setCountry] = useState<string>(
    job?.Country?.country || undefined
  );
  const [ciity, setCity] = useState<string>(job?.city || "");
  const [selectSkill, setSelectSkill] = useState<any>();

  const bodyReq = {
    city: ciity,
    period: period,
    user: authUser,
    area: areaType,
    about: aboutJob,
    level: levelType,
    country: country,
    skillsList: skillsList,
    avatar: authUser?.avatar,
  };

  console.log(job?.Skills?.map((item: any) => console.log(item)));

  function handleSubmitNewJob() {
    if (
      ciity &&
      country &&
      period &&
      areaType &&
      aboutJob &&
      levelType &&
      skillsList
    ) {
      if (job) {
      }
      if (createJob) {
        handleCloseJobModal();
        createJob(bodyReq);
      }
    } else {
      setError({ field: "All", message: "All fields are required" });
      setTimeout(() => setErrors(() => []), 2000);
    }
  }

  return (
    <div className="bg-white  md:rounded-md py-10 px-5 relative w-90% h-auto flex justify-center  items-center flex-col">
      <p className="text-desaturatedDarkCyan text-2xl">{`${
        job ? "Edit" : "Create a"
      } Job`}</p>
      {errors.length > 0 && (
        <div
          className={`e
            bg-red-200 flex justify-center items-start 
            rounded-lg text-[12px] italic font-semibold text-red-600 my-4 py-1 px-3
            animate-openMenu flex-col space-x-2 w-full absolute top-[12rem]
            `}
        >
          <p>Please correct the error(s) below:</p>
          {errors.map((error: ErrorAuth, index: number) => {
            return <p key={index}>- {error.message}</p>;
          })}
        </div>
      )}
      <div className="mt-16 flex gap-y-2 flex-col flex-wrap w-full px-4">
        <SelectItemsComponent
          title="Select level"
          type={levelType}
          setType={setLevelType}
          listOptions={["Intern", "Junior", "Middle", "Senior", "Specialist"]}
          handleHidden={true}
        />
        <SelectItemsComponent
          title="Select period"
          listOptions={["Full Time", "Part Time", "Contract", "Temporary"]}
          type={period}
          setType={setPeriod}
          handleHidden={true}
        />
        <SelectItemsComponent
          title="Select  area"
          type={areaType}
          setType={setAreaType}
          listOptions={["Frontend", "Backend", "FullStack"]}
          handleHidden={true}
        />
        <CountryListComponent
          country={country}
          setCity={setCity}
          setCountry={setCountry}
          city={ciity}
        />
        <textarea
          className="bg-LightGrayishCyan resize-none w-full h-[200px] text-sm py-2 px-2 outline-none rounded-lg 
      "
          placeholder={"Write about the job..."}
          value={aboutJob}
          onChange={(e) => setAboutJob(e.target.value)}
        ></textarea>
      </div>
      <form
        className="flex justify-start items-center w-full gap-x-2 mt-2 px-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectSkill) {
            setSkillsList(() => [selectSkill]);
          } else {
            if (
              skillsList?.find(
                (item: string) =>
                  item?.toLowerCase() === selectSkill?.toLowerCase()
              )
            ) {
              return;
            }
            setSkillsList((prevState: any) => [...prevState, selectSkill]);
          }
          setSelectSkill("");
        }}
      >
        <p className="text-desaturatedDarkCyan  text-sm">Skills:</p>
        <input
          type="text"
          className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm  text-desaturatedDarkCyan "
          value={selectSkill}
          onChange={(e) => {
            e.preventDefault();
            setSelectSkill(e.target.value);
          }}
        />
        <p
          onClick={() => setSkillsList(() => [])}
          className={`
                cursor-pointer font-semibold text-[14px] text-desaturatedDarkCyan hover:underline`}
        >
          Clear
        </p>
      </form>
      <div
        className={`
            mt-3 flex justify-start items-center flex-wrap gap-x-[10px] gap-y-2 w-full px-4`}
      >
        {skillsList?.map((skill: string, i) => {
          return (
            <div
              key={i}
              className="bg-LightGrayishCyan text-desaturatedDarkCyan shadow-md text-sm min-w-[90px]  h-6 overflow-hidden flex justify-between items-center rounded-sm"
            >
              <p className="px-1 text-[13px] font">{skill}</p>
              <div
                className={
                  "text-desaturatedDarkCyan bg-desaturatedDarkCyan hover:bg-veryDarkGraishCyan w-[20px] cursor-pointer flex justify-center items-center"
                }
              >
                <RiCloseFill
                  color="white"
                  size={24}
                  onClick={() => {
                    setSkillsList(() =>
                      skillsList.filter((item: any) => item != skill)
                    );
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`${skillsList.length > 0 && "mt-3"}
      flex w-[92%] space-x-1`}
      >
        <Button
          title="Save"
          className="bg-desaturatedDarkCyan rounded-md text-sm text-white py-2 flex-1"
          onClick={() => {
            handleSubmitNewJob();
          }}
        />
        <Button
          title="Cancel"
          className="bg-red-300 rounded-md text-sm text-white py-2 flex-1"
          onClick={() => {
            handleCloseJobModal();
          }}
        />
      </div>
    </div>
  );
}
