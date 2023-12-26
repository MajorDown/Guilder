'use client'
import { createContext, useContext, useEffect, useState, PropsWithChildren, useMemo } from "react";
import {User, UserContext} from "../types";

/**
 * Contexte utilisateur React.
 * @type {React.Context<UserContext | undefined>}
 */
const userContext = createContext<UserContext | undefined>(undefined);

/**
 * Hook personnalisé pour accéder au contexte utilisateur.
 * @returns {UserContext | undefined} Le contexte utilisateur.
 */
export function useUserContext() {
  const context = useContext(userContext);
  return context;
}

/**
 * Fournisseur de contexte utilisateur React.
 * @param {PropsWithChildren} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant fournisseur de contexte utilisateur.
 */
export const UserProvider = (props: PropsWithChildren) => {
  /**
   * État local pour stocker les informations utilisateur.
   * @type {React.State<User | null>}
   */
  const [user, setUser] = useState<User | null>(null);

  /**
   * Effet de montage pour récupérer l'utilisateur depuis le stockage local.
   */
  useEffect(() => {
    const savedUser: string | null = localStorage.getItem("guilder_user");
    if (savedUser) {
      const actualUser: User | null = JSON.parse(savedUser);
      if (actualUser) setUser(actualUser);
    }
  }, []);

  /**
   * Valeur du contexte mémorisée pour éviter les recalculs inutiles.
   * @type {UserContext}
   */
  const contextValue = useMemo(() => {
    return { user, updateUser: () => setUser } as UserContext;
  }, [user]);

  /**
   * Rendu du composant fournisseur de contexte utilisateur.
   * @returns {JSX.Element} Le composant fournisseur de contexte utilisateur.
   */
  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};
