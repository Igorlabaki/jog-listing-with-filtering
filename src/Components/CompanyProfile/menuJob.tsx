import React, { memo } from "react";
import { useState } from "react";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Button } from "../util/Button";
import dynamic from "next/dynamic";
import { propsMenuJobModal } from "../modals/menuJobModal";
import {
  AlertDeleteModal,
  propsAlertDeleteModal,
} from "../modals/alertDeleteModal";
import { IoIosClose } from "react-icons/io";
import useJobContext from "../../hook/useJobContext";
import { Job } from "@prisma/client";
import Router, { useRouter } from "next/router";

interface EditProps {
  handleOpenAlertDeleteModal: any;
  handleOpenEditJobModal: any;
}

export function MenuJobComponent({
  handleOpenAlertDeleteModal,
  handleOpenEditJobModal,
}: EditProps) {
  const [modal, setModal] = useState(false);

  function handleOpenModal() {
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
  }

  const MenuJobModalComponent = dynamic<propsMenuJobModal>(() => {
    return import("../modals/menuJobModal").then(
      (comp) => comp.MenuJobModalModal
    );
  });

  const router = useRouter();
  return (
    <div className="absolute top-2 right-2">
      {router.asPath.includes("/companyProfile") ? (
        <div
          className="absolute top-2 right-2 z-30"
          onClick={() => handleOpenModal()}
        >
          <BsThreeDots className={`cursor-pointer`} />
        </div>
      ) : null}
      {modal ? (
        <MenuJobModalComponent onClose={handleCloseModal}>
          <div className="bg-white w-full text-desaturatedDarkCyan">
            <Button
              title="Edit"
              icon={<MdOutlineModeEditOutline size={19} />}
              className="hover:bg-secundary flex space-x-2 justify-start items-center w-[100%] py-2 px-5 hover:bg-LightGrayishCyan"
              onClick={() => {
                handleOpenEditJobModal();
                handleCloseModal();
              }}
            />
            <Button
              title="Delete"
              icon={<BsTrash />}
              className="flex space-x-2 justify-start items-center w-[100%] py-2 px-5 hover:bg-LightGrayishCyan"
              onClick={() => {
                handleOpenAlertDeleteModal();
                handleCloseModal();
              }}
            />
          </div>
        </MenuJobModalComponent>
      ) : null}
    </div>
  );
}
