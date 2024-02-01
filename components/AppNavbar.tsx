'use client'
import { useState, useEffect } from 'react';
import { ConnectedAdmin, ConnectedUser, MembersList } from '@/types';
import { useAdminContext } from '@/contexts/adminContext';
import { useUserContext } from '@/contexts/userContext';
import { useGuildContext } from '@/contexts/guildContext';
import UINavLink from './UI/UINavLink';

const AppNavbar = () => {
    const {admin, updateAdmin} = useAdminContext();
    const {user, updateUser} = useUserContext();
    const {members, updateMembers} = useGuildContext();
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
      setHasCheckedLog(true);
    }, [admin, user])

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
    
    return (<>
        {hasCheckedLog && (<>
            {admin && (<>
                <UINavLink label={"Membres"} href={'/'} icon={'/images/guild.svg'} showActivation/>
                <UINavLink label={"Outils"} href={'/config'} icon={'/images/tools.svg'} showActivation/>
                <UINavLink label={"Notifs"} href={'/'} icon={'/images/analyse.svg'} showActivation/>
                <UINavLink label={"Options"} href={'/options'} icon={'/images/options.svg'} showActivation/>
                <UINavLink label={"Déconnexion"} href={'/'} icon={'/images/logout.svg'} onClick={disconnectAdmin} />
            </>
            )}
            {user && (<>
                <UINavLink label={"Déclarer"} href={'/'} icon={'/images/new-intervention.svg'} showActivation/>
                <UINavLink label={"Historique"} href={'/'} icon={'/images/stats.svg'} showActivation/>
                <UINavLink label={"Guilde"} href={'/'} icon={'/images/guild.svg'} showActivation/>
                <UINavLink label={"Options"} href={'/options'} icon={'/images/options.svg'} showActivation/>
                <UINavLink label={"Déconnexion"} href={'/'} icon={'/images/logout.svg'} onClick={disconnectUser} />
            </>
            )}
            {!admin && !user && (<>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} showActivation/>
                <UINavLink label={"Créer sa guilde"} href={'/inscription'} icon={'/images/guild.svg'} showActivation/>
            </>)}
        </>)
      }
    </>
  )
}

export default AppNavbar;