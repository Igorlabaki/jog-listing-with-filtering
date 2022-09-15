import React from "react";
import useUserContext from "../../hook/useUserContext";

import { User } from "../../Interfaces";
import { UserComponent } from "./userComponent";

export default function UsersComponent() {
  const { filterUserResults } = useUserContext();

  return (
    <div
      className={`flex flex-col flex-1 min-h-screen space-y-10 md:space-y-2 
  py-5 md:py-0 my-4  md:my-0$`}
    >
      {filterUserResults?.map((user: User) => {
        return <UserComponent user={user} key={user.id} />;
      })}
    </div>
  );
}
