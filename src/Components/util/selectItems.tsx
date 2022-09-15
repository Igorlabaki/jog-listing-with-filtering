import React from "react";

interface SelectItemProps {
  handleHidden?: boolean;
  type: any;
  setType: any;
  listOptions: string[];
  title: string;
}

export default function SelectItemsComponent({
  handleHidden,
  type,
  setType,
  listOptions,
  title,
}: SelectItemProps) {
  return (
    <div
      className={`w-full flex flex-col justify-center items-start  
        ${handleHidden ? "flex" : "hidden"}
    `}
    >
      <p className="text-desaturatedDarkCyan  font-semibold text-sm">
        {title}:
      </p>
      <div className="flex gap-4 text-sm text-veryDarkGraishCyan font-light">
        {listOptions.map((item) => {
          return (
            <>
              <div
                className="flex justify-center items-center gap-2 cursor-pointer "
                key={item}
              >
                <div
                  className={`h-[12px] w-[12px] rounded-full ${
                    type?.includes(item)
                      ? "border-[1px] border-darkGrayishYan bg-desaturatedDarkCyan"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    setType(() => item);
                  }}
                />
                <p>{item[0].toUpperCase() + item.substr(1)}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
