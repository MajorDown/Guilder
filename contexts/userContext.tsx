'use client'
import { createContext, useContext, useState, PropsWithChildren } from "react";
import {ConnectedUser, UserContext } from "../types";

/**
 * Contexte utilisé pour fournir et consommer l'état de l'utilisateur connecté
 * à travers l'application.
 */
const userContext: React.Context<UserContext> = createContext<UserContext>(
  {
    user: null, updateUser: () => {}
  }
);

/**
 * simplifie l'accès et la mise à jour userContext dans les composants de l'application. 
 *
 * @returns {UserContext} L'état actuel de l'utilisateur et la fonction pour le mettre à jour.
 */
export function useUserContext(): UserContext {
  const context = useContext(userContext);
  return context;
}

/**
 * englobe les composants enfants dans l'application et fournit
 * l'état de userContext à travers un contexte React. Il utilise un hook d'état pour
 * accéder au getter (user) et au setter (updateUser) du userContext.
 *
 * @param {PropsWithChildren} props Les props du composant, y compris les enfants à rendre.
 * @returns {JSX.Element} Un composant Provider qui englobe les enfants avec le contexte de l'utilisateur.
 */
export const UserProvider = (props: PropsWithChildren): JSX.Element => {
  const [user, updateUser] = useState<ConnectedUser | null>(null);


  return (
    <userContext.Provider value={{user, updateUser}}>
      {props.children}
    </userContext.Provider>
  );
};
