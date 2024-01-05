'use client'
import { createContext, useContext, useState, PropsWithChildren } from "react";
import {ConnectedAdmin, AdminContext, MembersList } from "../types";

/**
 * Contexte utilisé pour fournir et consommer l'état de l'utilisateur connecté
 * à travers l'application.
 */
const adminContext: React.Context<AdminContext> = createContext<AdminContext>(
  {
    admin: null,
    updateAdmin: () => {},
    administratedMembers: null,
    updateAdministratedMembers: () => {},
  }
);

/**
 * simplifie l'accès et la mise à jour userContext dans les composants de l'application. 
 *
 * @returns {UserContext} L'état actuel de l'utilisateur et la fonction pour le mettre à jour.
 */
export function useAdminContext(): AdminContext {
  const context = useContext(adminContext);
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
export const AdminProvider = (props: PropsWithChildren): JSX.Element => {
  const [admin, updateAdmin] = useState<ConnectedAdmin | null>(null);
  const [administratedMembers, updateAdministratedMembers] = useState<MembersList | null>(null);


  return (
    <adminContext.Provider value={{admin, updateAdmin, administratedMembers, updateAdministratedMembers}}>
      {props.children}
    </adminContext.Provider>
  );
};
