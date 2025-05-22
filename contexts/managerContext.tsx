'use client'
import { createContext, Context, useContext, useState, PropsWithChildren } from "react";
import {ConnectedManager, ManagerContext } from "@/types";

/**
 * Contexte utilisé pour fournir et consommer l'état du Manager connecté
 * à travers l'application.
 */
const managerContext: Context<ManagerContext> = createContext<ManagerContext>(
  {
    manager: null,
    updateManager: () => {},
  }
);

/**
 * simplifie l'accès et la mise à jour userContext dans les composants de l'application. 
 *
 * @returns {AdminContext} L'état actuel du Manager et la fonction pour le mettre à jour.
 */
export function useManagerContext(): ManagerContext {
  const context = useContext(managerContext);
  return context;
}

/**
 * englobe les composants enfants dans l'application et fournit
 * l'état de ManagerContext à travers un contexte React. Il utilise un hook d'état pour
 * accéder au getter (got) et au setter (updateManager) du ManagerContext.
 *
 * @param {PropsWithChildren} props Les props du composant, y compris les enfants à rendre.
 * @returns {JSX.Element} Un composant Provider qui englobe les enfants avec le contexte du Manager.
 */
export const ManagerProvider = (props: PropsWithChildren): JSX.Element => {
  const [manager, updateManager] = useState<ConnectedManager | null>(null);

  return (
    <managerContext.Provider value={{manager, updateManager}}>
      {props.children}
    </managerContext.Provider>
  );
};