import { ReactNode, useState } from "react";
import useAuthContext from "../../hook/useAuthContext";

interface PropsNewModal {
  onClose: () => void;
  children: ReactNode;
}

export function ModalMenuComponent({ onClose, children }: PropsNewModal) {
  const [animation, setAnimation] = useState<boolean>(false);
  const { authUser } = useAuthContext();
  const handleOutsideClick = (e: any) => {
    setAnimation(true);
    if (e.target.id === "external") {
      setTimeout(onClose, 200);
    }
  };

  return (
    <>
      <div
        id="external"
        aria-hidden="true"
        onClick={handleOutsideClick}
        className="flex justify-center items-center w-full min-h-screen h-full fixed
         top-0 right-0 left-0 bottom-0  overflow-hidden opacity-60"
      />
      <div
        id="internal"
        className={`flex text-black absolute bg-gray-100
            flex-col justify-start items-start
            text-[0.5rem] font-normal
            border-none shadow-pattern ${
              authUser?.avatar ? "top-[4rem] right-[3.50rem]" : "top-6 right-8"
            } t z-50 
            overflow-hidden
            rounded-b-md rounded-tl-md 
            h-auto
            animate-openMenu ${animation === true ? "animate-closeMenu" : null}
      `}
      >
        {children}
      </div>
    </>
  );
}
