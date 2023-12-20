'use client'
import { createContext, useContext, useEffect, useState, PropsWithChildren, useMemo } from "react";
import {User, UserContext} from "../types";


const userContext = createContext<UserContext | undefined>(undefined);

export function useUserContext() {
  const context = useContext(userContext);
  return context;
}

export const UserProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser: string | null = localStorage.getItem("guilder_user");
    if (savedUser) {
        const actualUser: User | null = JSON.parse(savedUser);
        if (actualUser) setUser(actualUser);
    }
  }, []);

  const contextValue = useMemo(() => {
    return { user, updateUser: () => setUser } as UserContext;
  }, [user]);

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};
