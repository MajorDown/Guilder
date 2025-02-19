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
  const { admin, updateAdmin } = useAdminContext();
  const { member, updateMember } = useMemberContext();

  const [hasCheckedLog, setHasCheckedLog] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!admin) {
        const storageKey = process.env.NEXT_PUBLIC_LOCALSTORAGE_ADMINCONTEXT_KEY as string;

        // Vérification des deux stockages
        const adminData = localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey);
        
        if (adminData) {
          const actualAdmin: ConnectedAdmin = JSON.parse(adminData);
          updateAdmin(actualAdmin);
        } else {
          updateAdmin(null);
        }
      }

      if (!member) {
        const memberStorageKey = process.env.NEXT_PUBLIC_LOCALSTORAGE_MEMBERCONTEXT_KEY as string;
        const memberData = localStorage.getItem(memberStorageKey);
        
        if (memberData) {
          const actualMember: ConnectedMember = JSON.parse(memberData);
          updateMember(actualMember);
        } else {
          updateMember(null);
        }
      }
    }
    setHasCheckedLog(true);
  }, [admin, member]);

  const disconnectAdmin = () => {
    updateAdmin(null);
    const storageKey = process.env.NEXT_PUBLIC_LOCALSTORAGE_ADMINCONTEXT_KEY as string;
    
    // Suppression des données dans les deux stockages
    localStorage.removeItem(storageKey);
    sessionStorage.removeItem(storageKey);
  };

  const disconnectMember = () => {
    updateMember(null);
    const memberStorageKey = process.env.NEXT_PUBLIC_LOCALSTORAGE_MEMBERCONTEXT_KEY as string;
    localStorage.removeItem(memberStorageKey);
  };

  const storeAdmin = (adminData: ConnectedAdmin) => {
    const storageKey = process.env.NEXT_PUBLIC_LOCALSTORAGE_ADMINCONTEXT_KEY as string;

    if (adminData.authPersistence) {
      localStorage.setItem(storageKey, JSON.stringify(adminData));
    } else {
      sessionStorage.setItem(storageKey, JSON.stringify(adminData));
    }
  };

  return (
    <div id={"welcomer"}>
      {hasCheckedLog && (
        <>
          {admin && <p id="welcomerLine">Bienvenue {admin.name}</p>}
          {!admin && member && <p id="welcomerLine">Bienvenue {member.name}</p>}

          {!admin && !member && (
            <UINavLink href={"/connexion"} label={"Se connecter"} icon={'/images/icons/membre-white-dark.svg'} />
          )}
          {admin && (
            <UINavLink href={"/"} label={"Se déconnecter"} icon={'/images/icons/connexion.svg'} onClick={disconnectAdmin} />
          )}
          {!admin && member && (
            <UINavLink href={"/"} label={"Se déconnecter"} icon={'/images/icons/connexion.svg'} onClick={disconnectMember} />
          )}
        </>
      )}
    </div>
  );
};

export default Welcomer;
