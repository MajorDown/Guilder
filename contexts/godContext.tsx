'use client'
import { createContext, useContext, useState, PropsWithChildren } from "react";
import {ConnectedGod, GodContext } from "../types";

/**
 * Contexte utilisé pour fournir et consommer l'état du god connecté
 * à travers l'application.
 */
const godContext: React.Context<GodContext> = createContext<GodContext>(
  {
    god: null,
    updateGod: () => {},
  }
);

/**
 * simplifie l'accès et la mise à jour userContext dans les composants de l'application. 
 *
 * @returns {AdminContext} L'état actuel du god et la fonction pour le mettre à jour.
 */
export function useGodContext(): GodContext {
  const context = useContext(godContext);
  return context;
}

/**
 * englobe les composants enfants dans l'application et fournit
 * l'état de godContext à travers un contexte React. Il utilise un hook d'état pour
 * accéder au getter (got) et au setter (updategod) du godContext.
 *
 * @param {PropsWithChildren} props Les props du composant, y compris les enfants à rendre.
 * @returns {JSX.Element} Un composant Provider qui englobe les enfants avec le contexte du god.
 */
export const GodProvider = (props: PropsWithChildren): JSX.Element => {
  const [god, updateGod] = useState<ConnectedGod | null>(null);

  return (
    <godContext.Provider value={{god, updateGod}}>
      {props.children}
    </godContext.Provider>
  );
};