'use client'
import { useEffect } from 'react';
import { Amatic_SC } from 'next/font/google';
import { ConnectedUser, MembersList } from '@/types';
import AppLink from './AppLink';
import { useUserContext } from '@/contexts/userContext';
import { useGuildContext } from '@/contexts/guildContext';

const amatic = Amatic_SC({weight: "700", subsets: ["latin"], display: 'swap', variable: "--font-Amatic-SC"});

const Header = () => {
  const {user, updateUser} = useUserContext();
  const {members, updateMembers} = useGuildContext();
  
  useEffect(() => {
    if (window != undefined && !user) {
      if (!user) {
        const userData = localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_USERCONTEXT_KEY as string);
        if (userData) {;
          const actualUser: ConnectedUser = JSON.parse(userData);
          updateUser(actualUser);
        }
        else updateUser(null);
      }
      if (!members) {
        const membersData = localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_GUILDCONTEXT_KEY as string);
        if (membersData) {
          const actualMembers: MembersList = JSON.parse(membersData);
          updateMembers(actualMembers);
        }
        else updateMembers(null);
      }
    }
  }, [])

  const disconnectUser = () => {
    updateUser(null);
    localStorage.removeItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_USERCONTEXT_KEY as string);
    updateMembers(null);
    localStorage.removeItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_GUILDCONTEXT_KEY as string);
  }

  return (
    <header>
      <div id="title">
        <AppLink href="/"><h1 className={amatic.className}>Guilder</h1></AppLink>
        <img src="/images/logo.png" alt="logo" width="200px"/>
      </div>
      <div id="headerNav">
        <div id="userOptions">
          {user && 
          <>
            <p>{user.mail}</p>
            <p>|</p>
            <p>{user.counter} points</p>
            <p>|</p>
          </>
          }
          {user ? <AppLink onClick={() => disconnectUser()} href="/" showActivation>Déconnexion</AppLink>
           : <AppLink href="/connexion" showActivation>Connexion</AppLink>}
        </div>
       {user && <nav id="operationNav">
          <AppLink href="/operation" showActivation={true}>Déclarer une opération</AppLink>
          <p>|</p>          
          <AppLink href="/historique" showActivation={true}>Historique des opérations</AppLink>
          <p>|</p>
          <AppLink href="/guilde" showActivation={true}>Membres de la guilde</AppLink>
        </nav>}
      </div>
    </header>
  )
}

export default Header;