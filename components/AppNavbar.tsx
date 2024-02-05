'use client'
import { useState, useEffect } from 'react';
import { ConnectedAdmin, ConnectedMember} from '@/types';
import { useAdminContext } from '@/contexts/adminContext';
import { useMemberContext } from '@/contexts/memberContext';
import UINavLink from './UI/UINavLink';

const AppNavbar = () => {
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
          const userData = localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_USERCONTEXT_KEY as string);
          if (userData) {;
            const actualUser: ConnectedMember = JSON.parse(userData);
            updateMember(actualUser);
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
      localStorage.removeItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_USERCONTEXT_KEY as string);
    }
    
    return (<>
        {hasCheckedLog && (<>
            {admin && (<>
                <UINavLink label={"Membres"} href={'/membres'} icon={'/images/guild.svg'} showActivation/>
                <UINavLink label={"Outils"} href={'/config'} icon={'/images/tools.svg'} showActivation/>
                <UINavLink label={"Notifs"} href={'/'} icon={'/images/analyse.svg'} showActivation/>
                <UINavLink label={"Options"} href={'/options'} icon={'/images/options.svg'} showActivation/>
                <UINavLink label={"Déconnexion"} href={'/'} icon={'/images/logout.svg'} onClick={() => disconnectAdmin()} />
            </>
            )}
            {member && (<>
                <UINavLink label={"Déclarer"} href={'/'} icon={'/images/new-intervention.svg'} showActivation/>
                <UINavLink label={"Historique"} href={'/'} icon={'/images/stats.svg'} showActivation/>
                <UINavLink label={"Guilde"} href={'/'} icon={'/images/guild.svg'} showActivation/>
                <UINavLink label={"Options"} href={'/options'} icon={'/images/options.svg'} showActivation/>
                <UINavLink label={"Déconnexion"} href={'/'} icon={'/images/logout.svg'} onClick={() => disconnectMember()} />
            </>
            )}
            {!admin && !member && (<>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} showActivation/>
                <UINavLink label={"Créer sa guilde"} href={'/inscription'} icon={'/images/guild.svg'} showActivation/>
            </>)}
        </>)
      }
    </>
  )
}

export default AppNavbar;