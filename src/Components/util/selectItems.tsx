import React from "react";

interface SelectItemProps {
  handleHidden?: boolean;
  type: any;
  setType: any;
  listOptions: string[];
  title: string;
  flexRow?: boolean;
}

export default function SelectItemsComponent({
  handleHidden,
  type,
  setType,
  listOptions,
  title,
  flexRow,
}: SelectItemProps) {
  return (
    <div
      className={`w-full flex ${
        flexRow
          ? "flex-row justify-start items-center space-x-4 py-2 mt-2  "
          : "flex-col justify-center items-start"
      }   
        ${handleHidden ? "flex" : "hidden"}
    `}
    >
      <p className="text-desaturatedDarkCyan   text-sm">{title}:</p>
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
                    if (item === type) {
                      setType(() => "");
                    } else {
                      setType(() => item);
                    }
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
