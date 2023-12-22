'use client'
import {useState, useEffect} from 'react';
import AppLink from './AppLink';
import { Amatic_SC } from 'next/font/google';
const amatic = Amatic_SC({weight: "700", subsets: ["latin"], display: 'swap', variable: "--font-Amatic-SC"});

const Header = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const mail = "romain.fouillaron@gmx.fr";
  const points = "6";

  return (
    <header>
      <div id="title">
        <AppLink href="/"><h1 className={amatic.className}>Guilder</h1></AppLink>
        <img src="/images/logo.png" alt="logo" width="200px"/>
      </div>
      <div id="headerNav">
        <div id="userOptions">
          <p>{mail}</p>
          <p>|</p>
          <p>{points} points</p>
          <p>|</p>
          {isConnected ? <AppLink href="/connexion" showActivation>Déconnexion</AppLink>
           : <AppLink href="/connexion" showActivation>Connexion</AppLink>}
        </div>
        <nav id="operationNav">
          <AppLink href="/operation" showActivation={true}>Déclarer une opération</AppLink>
          <p>|</p>          
          <AppLink href="/historique" showActivation={true}>Historique des opérations</AppLink>
          <p>|</p>
          <AppLink href="/guild" showActivation={true}>Membres de la guilde</AppLink>
        </nav>
      </div>
    </header>
  )
}

export default Header;