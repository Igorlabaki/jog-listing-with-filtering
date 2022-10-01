import { User } from "@prisma/client";
import React, { useEffect } from "react";
import useUserContext from "../../hook/useUserContext";

import { UserComponent } from "./userComponent";

export default function UsersComponent() {
  const { userList, getAllUsers } = useUserContext();

  useEffect(() => {
    if (getAllUsers) {
      getAllUsers();
    }
  }, []);

  return (
    <div
      className={`flex flex-col flex-1 min-h-screen space-y-16 md:space-y-2 
  py-5 md:py-0 my-10  md:my-0$`}
    >
      {userList?.map((user: User) => {
        return (
          <div key={user.id}>
            <UserComponent user={user} key={user.id} />
          </div>
        );
      })}
    </div>
  );
}
