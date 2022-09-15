import { ReactNode } from "react";

export interface propsAuthModal {
  onClose: () => void;
  children: ReactNode;
}

export function ChangePhotoModal({ onClose, children }: propsAuthModal) {
  const handleOutsideClick = (e: any) => {
    if (e.target.id) onClose();
  };

  return (
    <>
      <div className="flex w-full h-full justify-center items-center overflow-y-scroll z-50">
        <div
          id="external"
          onClick={handleOutsideClick}
          className="flex justify-center items-center w-full min-h-screen h-full fixed top-0 right-0 left-0 bottom-0 bg-black overflow-hidden opacity-60"
        />
        <div
          id="internal"
          className={`
            flex justify-center items-center md:rounded-[1.25rem] flex-col
            z-[60] border-none absolute top-0 right-0 w-screen h-screen left-0 
            md:w-[400px] md:m-auto
            rounded-sm overflow-hidden
            `}
        >
          {children}
        </div>
      </div>
    </>
  );
}
