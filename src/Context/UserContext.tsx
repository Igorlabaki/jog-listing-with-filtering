import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import { users } from "../database/users";
import useSearchContext from "../hook/useSearchSContext";

interface UserContextProvider {
  children: ReactNode;
}
interface UserContext {
  user?: any;
  userList?: any;
  filterUserResults?: any;
  selectUserById: (id: any) => any;
}

const initialState: UserContext = {
  selectUserById: () => {},
};

export const UserContext = createContext<UserContext>(initialState);

export function UserContextProvider({ children }: UserContextProvider) {
  const [userList, setUsersList] = useState<any>();
  const [user, setUser] = useState<any>();
  const { search, setSearch } = useSearchContext();

  const listOrder = users.map((user: any) => {
    user.skills.sort();
    console.log("j");
    return user;
  });

  const filterUserResults = listOrder.filter((user: any) => {
    const list = [];
    for (let index = 0; index < search.length; index++) {
      const filterCase = user.skills.map((skill: string) =>
        skill.toLocaleUpperCase()
      );
      if (filterCase.includes(search[index].toLocaleUpperCase())) {
        list.push(true);
      } else {
        list.push(false);
      }
    }
    return list.every((user) => user === true);
  });

  function selectUserById(userId: string) {
    const user = users.find((user) => user.id === userId);
    setUser(() => user);
    return;
  }

  useEffect(() => {
    setUsersList(() => users);
  }, []);

  return (
    <UserContext.Provider
      value={{ userList, filterUserResults, selectUserById, user }}
    >
      {children}
    </UserContext.Provider>
  );
}
