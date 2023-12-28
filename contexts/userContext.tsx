'use client'
import { createContext, useContext, useEffect, useState, PropsWithChildren, useMemo } from "react";
import {ConnectedUser, UserContext } from "../types";

const userContext: React.Context<UserContext | undefined> = createContext<UserContext | undefined>(undefined);

export function useUserContext(): UserContext | undefined {
  const context = useContext(userContext);
  return context;
}

export const UserProvider = (props: PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<ConnectedUser | null>();

  useEffect(() => {
    const savedUser: string | null = localStorage.getItem("guilder_userContext");
    if (savedUser) {
      const actualUser: ConnectedUser | null = JSON.parse(savedUser);
      if (actualUser) setUser(actualUser);
    }
  }, []);

  const contextValue: UserContext | undefined= useMemo(() => {
    if(user != null) return { user, updateUser: setUser };
    else return undefined;
  }, [user]);

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};
