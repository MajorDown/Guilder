'use client'
import { useEffect } from 'react';
import { Amatic_SC } from 'next/font/google';
import { ConnectedUser } from '@/types';
import AppLink from './AppLink';
import { useUserContext } from '@/contexts/userContext';

const amatic = Amatic_SC({weight: "700", subsets: ["latin"], display: 'swap', variable: "--font-Amatic-SC"});

const Header = () => {
  const {user, updateUser} = useUserContext();

  useEffect(() => {
    if (window != undefined) {
      const localData = localStorage.getItem(process.env.LOCALSTORAGE_USERCONTEXT_KEY as string);
      if (localData) {;
        const actualUser: ConnectedUser = JSON.parse(localData);
        updateUser(actualUser);
      }
      else updateUser(null);
    }
  }, [])

  const disconnectUser = () => {
    updateUser(null);
    localStorage.removeItem(process.env.LOCALSTORAGE_USERCONTEXT_KEY as string);
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