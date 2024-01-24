'use client'
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Amatic_SC } from 'next/font/google';
import { ConnectedAdmin, ConnectedUser, MembersList } from '@/types';
import { useAdminContext } from '@/contexts/adminContext';
import { useUserContext } from '@/contexts/userContext';
import { useGuildContext } from '@/contexts/guildContext';
import AppLink from './AppLink';
import UserNav from './UserNav';
import AdminNav from './AdminNav';
import UINavLink from './UI/UINavLink';

const amatic = Amatic_SC({weight: "700", subsets: ["latin"], display: 'swap', variable: "--font-Amatic-SC"});

const Header = () => {
  const {admin, updateAdmin} = useAdminContext();
  const {user, updateUser} = useUserContext();
  const {members, updateMembers} = useGuildContext();
  
  useEffect(() => {
    if (window != undefined && !admin) {
      if (!admin) {
        const adminData = localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_ADMINCONTEXT_KEY as string);
        if (adminData) {;
          const actualAdmin: ConnectedAdmin = JSON.parse(adminData);
          updateAdmin(actualAdmin);
        }
        else updateAdmin(null);
      }
    }
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
  
  const disconnectAdmin = () => {
    updateAdmin(null);
    localStorage.removeItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_ADMINCONTEXT_KEY as string);
  }

  const disconnectUser = () => {
    updateUser(null);
    localStorage.removeItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_USERCONTEXT_KEY as string);
    updateMembers(null);
    localStorage.removeItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_GUILDCONTEXT_KEY as string);
  }

  return (
    <header>
      <Link id="appTitle" href={"/"}>
        <h1 className={amatic.className}>Guilder</h1>
        <Image src="/images/logo.png" alt="logo" width={200} height={94}/>
      </Link>
      <nav id="appNavbar">
        {admin && <AdminNav admin={admin} onDisconnect={() => disconnectAdmin()}/>}
        {!admin && user && <UserNav user={user} onDisconnect={() => disconnectUser()}/>}
        {!admin && !user && <UINavLink href="/connexion" label="Se connecter" icon="/images/user.svg" showActivation/>}
      </nav>
    </header>
  )
}

export default Header;