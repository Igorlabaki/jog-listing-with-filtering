import { ReactNode } from "react";

export interface propsAuthModal {
  onClose: () => void;
  children: ReactNode;
}

export function ModalAuthComponent({ onClose, children }: propsAuthModal) {
  const handleOutsideClick = (e: any) => {
    if (e.target.id) onClose();
  };

  return (
    <>
      <div className="flex w-full h-full justify-center items-center overflow-y-scroll">
        <div
          id="external"
          onClick={handleOutsideClick}
          className="flex justify-center items-center w-full min-h-screen h-full fixed top-0 right-0 left-0 bottom-0 overflow-hidden opacity-60"
        />
        <div
          id="internal"
          className={`
            flex justify-center items-center md:rounded-[1.25rem] flex-col
            z-[60] border-none absolute top-0 right-0 min-w-full h-screen md:flex md:h-[300px] md:w-[300px] md:top-10`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
