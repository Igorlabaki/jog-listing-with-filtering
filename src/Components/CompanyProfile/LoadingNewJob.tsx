import React from "react";

export function LoadingNewJob() {
  const list = [1, 2, 3, 4];

  return (
    <div className="flex flex-col space-y-16 lg:space-y-3">
      {list?.map((item: number) => {
        return (
          <>
            <div
              className="h-32 bg-gray-200 animate-pulse w-full rounded-lg mt-10"
              key={item}
            >
              <div className={`absolute `}>
                <div
                  className="h-20 w-20  bg-gray-200 rounded-full flex flex-col 
      justify-center items-center relative overflow-hidden bottom-10 left-4 lg:bottom-0 lg:left-0"
                ></div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
