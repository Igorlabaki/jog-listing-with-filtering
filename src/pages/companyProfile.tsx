import axios from "axios";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { Company } from "@prisma/client";
import { GetServerSideProps } from "next";
import { FaUserEdit } from "react-icons/fa";
import useJobContext from "../hook/useJobContext";
import { JobsComponent } from "../Components/jobs";
import { Button } from "../Components/util/Button";
import React, { useState, useEffect } from "react";
import useAuthContext from "../hook/useAuthContext";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { LayoutComponent } from "../Components/util/layout";
import { propsJobsModal } from "../Components/modals/jobsModal";
import { NewAvatarComponent } from "../Components/util/newAvatar";
import { CountryListComponent } from "../Components/util/countryList";
import { UserAvatarComponent } from "../Components/MyProfile/userAvatar";
import { propsAvatarModal } from "../Components/modals/changePhotoModal";
import { NewJobComponentModal } from "../Components/CompanyProfile/newJob";
import { LoadingNewJob } from "../Components/CompanyProfile/LoadingNewJob";

export default function CompanyProfile() {
  const { authUser, setAuthUser } = useAuthContext();
  const { getCompanyJobs, jobCompanyList, newJogoLoading } = useJobContext();

  const [isPhotoModalOpen, setIsOpenPhotoModal] = useState(false);
  const [isJobModalOpen, setIsOpenJobModal] = useState(false);
  const [editModeShow, setEditModeShow] = useState(false);
  const [country, setCountry] = useState<any>(authUser?.country);
  const [ciity, setCity] = useState<any>(authUser?.city);
  const [about, setAbout] = useState<any>(authUser?.about);
  const [name, setName] = useState<any>(authUser?.name);
  const [email, setEmail] = useState<any>(authUser?.email);

  function handleOpenPhotoModal() {
    setIsOpenPhotoModal(true);
  }
  function handleClosePhotoModal() {
    setIsOpenPhotoModal(false);
  }

  function handleOpenJobModal() {
    setIsOpenJobModal(true);
  }
  function handleCloseJobModal() {
    setIsOpenJobModal(false);
  }

  const NewJobModal = dynamic<propsJobsModal>(() => {
    return import("../Components/modals/jobsModal").then(
      (comp) => comp.JobsModal
    );
  });

  const NewAvatarModal = dynamic<propsAvatarModal>(() => {
    return import("../Components/modals/changePhotoModal").then(
      (comp) => comp.ChangePhotoModal
    );
  });

  async function updateRegularInformations() {
    const bodyReq = {
      id: authUser?.id,
      about: about,
      email: email,
      name: name,
      country: country,
      city: ciity,
    };
    const companyrUpdated = await axios
      .put("/api/company", bodyReq)
      .then((resp) => resp.data);

    setAuthUser((prev: Company) => ({
      ...companyrUpdated,
    }));

    setEditModeShow(false);
  }

  useEffect(() => {
    if (getCompanyJobs) {
      getCompanyJobs(authUser?.id);
    }
  }, []);

  return (
    <LayoutComponent>
      <div className="mt-16 bg-white py-3 px-2 rounded-lg shadow-isadora relative w-full mb-5 flex flex-row">
        <UserAvatarComponent handleOpenPhotoModal={handleOpenPhotoModal} />
        <div className="mt-12 md:mt-5 flex flex-col justify-start items-start px-5">
          {!editModeShow ? (
            <>
              <div className="w-full flex justify-between items-center text-desaturatedDarkCyan">
                <p className="text-2xl text-veryDarkGraishCyan">
                  {authUser?.name}
                </p>
                <FaUserEdit
                  onClick={() => setEditModeShow(true)}
                  className={`cursor-pointer`}
                />
              </div>
              <div className="flex text-sm text-gray-400 gap-x-1">
                <p>{authUser?.email}</p>
              </div>
              {authUser?.Country && (
                <div className="flex gap-x-2 mt-1">
                  <p className="text-[15px] text-desaturatedDarkCyan">
                    Currently Location:
                  </p>
                  <div className="flex text-veryDarkGraishCyan text-[14px] justify-start items-center space-x-1">
                    <p>{authUser?.Country.name}</p>,{" "}
                    <p>{authUser?.City.name}</p>
                  </div>
                </div>
              )}
              <div>
                {authUser?.about && (
                  <div className="flex flex-col  justify-center items-start w-full gap-y-2">
                    <p className="text-[15px] text-desaturatedDarkCyan">
                      About:
                    </p>
                    <p className="text-veryDarkGraishCyan bg-LightGrayishCyan w-full text-justify tracking-[0.02] text-[14px] rounded-md flex justify-start text-md font-light px-5 py-1 spa">
                      {authUser.about}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-3">
              <div className="w-full flex justify-end items-center">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    title="Save"
                    onClick={(e) => {
                      e.preventDefault();
                      updateRegularInformations();
                    }}
                    className="bg-desaturatedDarkCyan py-1 text-white font- text-[13px] rounded-md w-[60px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]"
                  />
                  <Button
                    type="button"
                    title="Cancel"
                    onClick={() => setEditModeShow(false)}
                    className="bg-red-400 py-1 text-white font- text-[13px] rounded-md w-[60px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <input
                  placeholder={authUser.name || "Type company name"}
                  type="text"
                  className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-light text-desaturatedDarkCyan"
                  value={name}
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                />
                <input
                  placeholder="Type your email"
                  type="email"
                  className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-light text-desaturatedDarkCyan"
                  value={email}
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
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
                  placeholder={
                    authUser?.bio ? "" : "Write about your compay..."
                  }
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full justify-between items-center  mb-3">
        <div className="flex gap-x-2 justify-start items-center text-desaturatedDarkCyan">
          <p className=" text-lg ">Job opportunities</p>
          <p>({jobCompanyList.length || 0})</p>
        </div>
        <div>
          <Button
            onClick={() => handleOpenJobModal()}
            title="New job"
            icon={<AiOutlinePlusCircle size={15} />}
            className="text-white bg-desaturatedDarkCyan text-sm py-1 px-2 rounded-lg shadow-lg flex gap-x-2 flex-row-reverse justify-center items-center hover:shadow-none"
          />
        </div>
      </div>
      {newJogoLoading ? (
        <LoadingNewJob />
      ) : (
        <JobsComponent profileCompany={true} listJobs={jobCompanyList} />
      )}
      {isJobModalOpen && (
        <NewJobModal onClose={handleCloseJobModal}>
          <NewJobComponentModal handleCloseJobModal={handleCloseJobModal} />
        </NewJobModal>
      )}
      {isPhotoModalOpen && (
        <NewAvatarModal onClose={handleClosePhotoModal}>
          <NewAvatarComponent handleClosePhotoModal={handleClosePhotoModal} />
        </NewAvatarModal>
      )}
    </LayoutComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["userToken"]: userToken } = parseCookies(ctx);
  const { ["companyToken"]: companyToken } = parseCookies(ctx);

  if (!userToken && !companyToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
