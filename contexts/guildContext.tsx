'use client'
import { createContext, useContext, useState, PropsWithChildren } from "react";
import { GuildContext, MembersList } from "../types";

/**
 * Contexte utilisé pour fournir et consommer l'état de la guilde de l'utilisateur connecté
 * à travers l'application.
 */
const guildContext: React.Context<GuildContext> = createContext<GuildContext>(
  {
    members: null, updateMembers: () => {}
  }
);

/**
 * simplifie l'accès et la mise à jour de guildContext dans les composants de l'application. 
 *
 * @returns {GuildContext} L'état actuel de la guilde et la fonction pour le mettre à jour.
 */
export function useGuildContext(): GuildContext {
  const context = useContext(guildContext);
  return context;
}

/**
 * englobe les composants enfants dans l'application et fournit
 * l'état de guildContext à travers un contexte React. Il utilise un hook d'état pour
 * accéder au getter (user) et au setter (updateUser) du guildContext.
 *
 * @param {PropsWithChildren} props Les props du composant, y compris les enfants à rendre.
 * @returns {JSX.Element} Un composant Provider qui englobe les enfants avec le contexte de l'utilisateur.
 */
export const GuildProvider = (props: PropsWithChildren): JSX.Element => {
  const [members, updateMembers] = useState<MembersList | null>(null);


  return (
    <guildContext.Provider value={{members, updateMembers}}>
      {props.children}
    </guildContext.Provider>
  );
};
