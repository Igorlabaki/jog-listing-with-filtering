import { Link, User } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { GoMarkGithub } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import useAuthContext from "../../hook/useAuthContext";
import { Button } from "../util/Button";
import { CountryListComponent } from "../util/countryList";
import SelectItemsComponent from "../util/selectItems";

interface Props {
  setEditMode: any;
  setLoadingData: any;
}

export default function EditModeComponent({
  setEditMode,
  setLoadingData,
}: Props) {
  const { authUser, setAuthUser } = useAuthContext();

  const [bio, setBio] = useState<any>(authUser?.bio);
  const [levelType, setLevelType] = useState<string | undefined | null>(
    authUser?.level
  );
  const [areaType, setAreaType] = useState<string | undefined | null>(
    authUser?.area
  );
  const [username, setUsername] = useState<any>(authUser?.username);
  const [email, setEmail] = useState<any>(authUser?.email);
  const [country, setCountry] = useState<any>(authUser?.country);
  const [ciity, setCity] = useState<any>(authUser?.city);
  const [linksList, setLinksList] = useState<any[]>(authUser.Link);
  const [link, setLink] = useState<Link>({
    fk_id_user: "",
    id: "",
    name: "",
  });

  async function updateRegularInformations() {
    setLoadingData(true);
    const bodyReq = {
      id: authUser?.id,
      bio: bio,
      level: levelType,
      area: areaType,
      email: email,
      username: username,
      country: country,
      city: ciity,
      linksList: linksList,
    };
    const userUpdated = await axios
      .put("/api/auth", bodyReq)
      .then((resp) => resp.data);

    setAuthUser((prev: User) => ({
      ...userUpdated,
    }));

    setEditMode(false);
    setTimeout(() => setLoadingData(false), 2000);
  }

  const listLinksUserAuth = authUser.Link.map((item: Link) => item.name);

  return (
    <div className="w-full relative flex flex-col gap-y-2 animate-openEditProfile">
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
            onClick={() => setEditMode(false)}
            className="bg-red-400 py-1 text-white font- text-[13px] rounded-md w-[60px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <SelectItemsComponent
          title="Select your level"
          type={levelType}
          setType={setLevelType}
          listOptions={["Intern", "Junior", "Middle", "Senior", "Specialist"]}
          handleHidden={true}
        />
      </div>
      <SelectItemsComponent
        title="Select your area"
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
      <input
        placeholder="Type your username"
        type="text"
        className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-light text-desaturatedDarkCyan"
        value={username}
        onChange={(e) => {
          e.preventDefault();
          setUsername(e.target.value);
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
      <form
        className="flex flex-col justify-center items-start w-full "
        onSubmit={(e) => {
          e.preventDefault();
          if (!linksList) {
            setLinksList(() => [link]);
          } else {
            if (
              linksList?.find(
                (item: Link) =>
                  item?.name.toLowerCase() === link?.name.toLowerCase()
              )
            ) {
              return;
            }
            setLinksList((prevState: any) => [...prevState, link]);
          }
          setLink((prev) => ({
            ...prev,
            name: "",
          }));
        }}
      >
        <div className="flex space-x-2 w-full">
          <p className="text-desaturatedDarkCyan  text-sm">Links:</p>
          <input
            type="text"
            className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm  text-desaturatedDarkCyan"
            value={link.name}
            onChange={(e) => {
              e.preventDefault();
              setLink((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <p
            className={`
             cursor-pointer font-semibold text-[14px] text-desaturatedDarkCyan hover:underline`}
            onClick={() => {
              setLinksList(() => []);
            }}
          >
            Clear
          </p>
        </div>
        <div className="w-full">
          {linksList &&
            linksList?.map((link: Link) => {
              return (
                <>
                  <div
                    className={`${
                      listLinksUserAuth.includes(link.name)
                        ? "bg-white text-veryDarkGraishCyan shadow-lg hover:border-[3px] border-LightGrayishCyan cursor-pointer"
                        : "text-gray-500 bg-gray-200"
                    }
                     w-full min-h-[50px]  
                    text-sm font-light relative py-1 px-2 rounded-md my-2 
                    flex justify-between items-center gap-3`}
                  >
                    <div className="flex gap-x-4">
                      {link.name?.includes("github") ? (
                        <GoMarkGithub size={25} />
                      ) : link.name?.includes("linkedin") ? (
                        <BsLinkedin size={30} />
                      ) : link.name?.includes("instagram") ? (
                        <BsInstagram size={30} />
                      ) : link.name?.includes("facebook") ? (
                        <AiFillFacebook size={30} />
                      ) : (
                        <BiWorld size={30} />
                      )}
                      <p>{link.name}</p>
                    </div>
                    <div className=" top-1 right-1  hover:bg-LightGrayishCyan rounded-full">
                      <IoIosClose
                        size={15}
                        className={"text-gray-500 cursor-pointer"}
                        onClick={() => {
                          setLinksList(() =>
                            linksList.filter((item: Link) => {
                              return item.name != link.name;
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </form>
      <textarea
        className="bg-LightGrayishCyan resize-none w-full h-[200px] text-sm py-2 px-2 outline-none rounded-lg 
      "
        placeholder={authUser?.bio ? "" : "Write about you..."}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>
    </div>
  );
}
