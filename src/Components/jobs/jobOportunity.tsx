import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useAuthContext from "../../hook/useAuthContext";
import useSearchContext from "../../hook/useSearchSContext";
import moment from "moment";
import SkillsComponent from "../util/skills";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Job, JobsSkills } from "@prisma/client";
import { FiUser } from "react-icons/fi";
import { FaReact } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import {
  AlertDeleteModal,
  propsAlertDeleteModal,
} from "../modals/alertDeleteModal";
import { Button } from "../util/Button";
import { IoIosClose } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { JobAvatarComponent } from "./jobAvatar";
import { BsThreeDots } from "react-icons/bs";
import { MenuJobComponent } from "../CompanyProfile/menuJob";
import dynamic from "next/dynamic";
import useJobContext from "../../hook/useJobContext";
import { NewJobComponentModal } from "../CompanyProfile/newJob";
import { propsJobsModal } from "../modals/jobsModal";
import { CardComponent } from "../util/card";
interface Props {
  job: any;
  token?: any;
  percentageMatch?: any;
}
export function JobOportunity({ job, percentageMatch }: Props) {
  const router = useRouter();
  const { setSearch } = useSearchContext();
  const { handleOpenAuthModal, session, authUser } = useAuthContext();
  const [alertDelete, setAlertDelete] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const { deleteJob } = useJobContext();

  function handleOpenAlerDeleteModal() {
    setAlertDelete(true);
  }

  function handleCloseAlertDeleteModal() {
    setAlertDelete(false);
  }
  function handleOpenEditJobModal() {
    setIsJobModalOpen(true);
  }

  function handleCloseEditJobModal() {
    setIsJobModalOpen(false);
  }

  const AlerteDeleteModalComponent = dynamic<propsAlertDeleteModal>(() => {
    return import("../modals/alertDeleteModal").then(
      (comp) => comp.AlertDeleteModal
    );
  });

  const EditJobModal = dynamic<propsJobsModal>(() => {
    return import("../modals/jobsModal").then((comp) => comp.JobsModal);
  });

  function handleRedirectAuthFilter() {
    if (session?.sessionToken) {
      router.push(`/job/${job?.id}`);
    } else {
      handleOpenAuthModal();
    }
  }
  const jobSkilss = job?.Skills?.map((item: any) => {
    return item.skill.text;
  });

  return (
    <>
      <CardComponent>
        <MenuJobComponent
          handleOpenEditJobModal={handleOpenEditJobModal}
          handleOpenAlertDeleteModal={handleOpenAlerDeleteModal}
        />

        <div className="flex relative " onClick={() => {}}>
          <JobAvatarComponent avatar={job?.avatar} />
          <div
            className={`space-y-1 pt-4 md:pt-0 flex flex-col justify-start items-start md:ml-4 mt-2 md:mt-0 w-full`}
          >
            <div className="flex justify-between w-full items-center  mt-2">
              <>
                <p
                  className="text cursor-pointer  font text-[24px] md:text-[20px] text-desaturatedDarkCyan"
                  onClick={() => {
                    handleRedirectAuthFilter();
                  }}
                >
                  {job?.Company?.name}
                </p>
              </>
            </div>
            <p
              className="font-semibold text-[20px] text-start cursor-pointer "
              onClick={() => {
                handleRedirectAuthFilter();
              }}
            >
              {job?.level?.name} {job?.area?.name}
            </p>
            <div className="flex justify-between items-center w-ful">
              <div className="flex text-[13px] text-darkGrayishYan font-light gap-x-2">
                <p>{moment(job?.created_at, "YYYYMMDD").fromNow()}</p>
                <p>-</p>
                <p>{job?.period?.name}</p>
                <p>-</p>
                <p>{job?.Country?.name}</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="h2 my-2" />
        <div
          className="flex items-end text-[14px]  space-x-1
       text-desaturatedDarkCyan relative  flex-wrap gap-y-2"
        >
          <div
            className={`
         absolute top-[-100px] right-0 lg:right-5 lg:top-0 h-10 w-10 rounded-full text-sm flex justify-center items-center text-desaturatedDarkCyan `}
          >
            {percentageMatch ? (
              <CircularProgressbar
                value={percentageMatch}
                text={`${percentageMatch}%`}
                background={true}
                styles={{
                  path: {
                    stroke: "hsl(180, 29%, 50%)",
                  },
                  trail: {
                    // Trail color
                    stroke: "hsl(180, 52%, 96%)",
                  },
                  text: {
                    // Text color
                    fill: "hsl(180, 29%, 50%)",
                    // Text size
                    fontSize: "25px",
                  },
                  background: {
                    fill: "hsl(180, 52%, 96%)",
                  },
                }}
                className="bg-LightGrayishCyan rounded-full text-de"
              />
            ) : null}
          </div>
          <SkillsComponent skills={jobSkilss} />
        </div>
      </CardComponent>
      {alertDelete && (
        <AlerteDeleteModalComponent onClose={handleCloseAlertDeleteModal}>
          <div className="bg-white py-6 px-5 rounded-md relative flex justify-center items-center flex-col ">
            <div className="absolute top-1 right-1 hover:bg-LightGrayishCyan rounded-full">
              <IoIosClose
                size={25}
                className={"text-desaturatedDarkCyan cursor-pointer"}
                onClick={() => handleCloseAlertDeleteModal()}
              />
            </div>
            <p className="w-[80%]">{`Are you sure you want to delete this ${job.level.name} ${job.area.name} opportunity?`}</p>
            <div className="flex gap-2 w-full justify-center items-center mt-3">
              <Button
                type="button"
                title="Confirm"
                onClick={(e) => {
                  e.preventDefault();
                  if (deleteJob) {
                    deleteJob(job.id);
                  }
                }}
                className="bg-desaturatedDarkCyan py-1 text-white font- text-[13px] rounded-md w-[60px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]"
              />
              <Button
                type="button"
                title="Cancel"
                onClick={() => handleCloseAlertDeleteModal()}
                className="bg-red-400 py-1 text-white font- text-[13px] rounded-md w-[60px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]"
              />
            </div>
          </div>
        </AlerteDeleteModalComponent>
      )}
      {isJobModalOpen && (
        <EditJobModal onClose={handleCloseEditJobModal}>
          <NewJobComponentModal
            handleCloseJobModal={handleCloseEditJobModal}
            job={job}
          />
        </EditJobModal>
      )}
    </>
  );
}
