'use client'
import { useState, useEffect } from 'react';
import { useAdminContext } from '@/contexts/adminContext';
import { useMemberContext } from '@/contexts/memberContext';
import UINavLink from './UI/UINavLink';
import { ConnectedAdmin, ConnectedMember } from '@/types';

/**
 * @function Welcomer
 * @description Composant pour accueillir l'utilisateur.
 * @returns {JSX.Element} Un message de bienvenue.
 */
const Welcomer = () => {
  const {admin, updateAdmin} = useAdminContext();
  const {member, updateMember} = useMemberContext();

  const [hasCheckedLog, setHasCheckedLog] = useState<boolean>(false);
    
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
    if (window != undefined && !member) {
      if (!member) {
        const memberData = localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_MEMBERCONTEXT_KEY as string);
        if (memberData) {;
          const actualMember: ConnectedMember = JSON.parse(memberData);
          updateMember(actualMember);
        }
        else updateMember(null);
      }
    }
    setHasCheckedLog(true);
  }, [admin, member])

  const disconnectAdmin = () => {
    updateAdmin(null);
    localStorage.removeItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_ADMINCONTEXT_KEY as string);
  }

  const disconnectMember = () => {
  updateMember(null);
  localStorage.removeItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_MEMBERCONTEXT_KEY as string);
  }

  return (
    <div id={"welcomer"}>
      {hasCheckedLog && (<>
        <>
          {admin && <p id="Welcomer">Bienvenue {admin.name} !</p>}
          {!admin && member && <p id="Welcomer">Bienvenue {member.name} !</p>}
        </>
        <>
          {!admin && !member && <>
            <UINavLink href={"/signup"} label={"Créer sa guilde"} icon={'/images/guild.svg'} />
            <UINavLink href={"/login"} label={"Se connecter"} icon={'/images/user.svg'} />
          </>}
          {admin && <UINavLink href={"/"} label={"Se déconnecter"} icon={'/images/logout.svg'} onClick={() => disconnectAdmin()}/>}
          {!admin && member && <UINavLink href={"/"} label={"Se déconnecter"} icon={'/images/logout.svg'} onClick={() => disconnectMember()}/>}
        </>
      </>)}
    </div>
  )
}

export default Welcomer;