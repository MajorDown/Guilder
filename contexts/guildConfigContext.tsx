'use client'
import { createContext, useContext, useState, PropsWithChildren } from "react";
import {GuildConfig, GuildConfigContext } from "../types";

/**
 * Contexte utilisé pour fournir et consommer l'état du guildConfig 
 * à travers l'application.
 */
const guildConfigContext: React.Context<GuildConfigContext> = createContext<GuildConfigContext>(
  {
    guildConfig: null,
    updateGuildConfig: () => {},
  }
);

/**
 * simplifie l'accès et la mise à jour guildConfigContext dans les composants de l'application. 
 *
 * @returns {guildConfigContext} L'état actuel du guildConfig et la fonction pour le mettre à jour.
 */
export function useguildConfigContext(): GuildConfigContext {
  const context = useContext(guildConfigContext);
  return context;
}

/**
 * englobe les composants enfants dans l'application et fournit
 * l'état de guildConfigContext à travers un contexte React. Il utilise un hook d'état pour
 * accéder au getter (guildConfig) et au setter (updateguildConfig) du guildConfigContext.
 *
 * @param {PropsWithChildren} props Les props du composant, y compris les enfants à rendre.
 * @returns {JSX.Element} Un composant Provider qui englobe les enfants avec le contexte de l'guildConfig.
 */
export const GuildConfigProvider = (props: PropsWithChildren): JSX.Element => {
  const [guildConfig, updateGuildConfig] = useState<GuildConfig | null>(null);

  return (
    <guildConfigContext.Provider value={{guildConfig, updateGuildConfig}}>
      {props.children}
    </guildConfigContext.Provider>
  );
};
