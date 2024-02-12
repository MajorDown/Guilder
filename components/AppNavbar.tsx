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
    
    return (<>
        {hasCheckedLog && (<>
            {admin && (<>
                <UINavLink label={"Membres"} href={'/membres'} icon={'/images/guild.svg'} showActivation/>
                <UINavLink label={"Outils"} href={'/config'} icon={'/images/tools.svg'} showActivation/>
                <UINavLink label={"Options"} href={'/options'} icon={'/images/options.svg'} showActivation/>
                <UINavLink label={"Déconnexion"} href={'/'} icon={'/images/logout.svg'} onClick={() => disconnectAdmin()} />
            </>
            )}
            {!admin && member && (<>
                <UINavLink label={"Déclarer"} href={'/declaration'} icon={'/images/new-intervention.svg'} showActivation/>
                <UINavLink label={"Historique"} href={'/historique'} icon={'/images/stats.svg'} showActivation/>
                <UINavLink label={"Guilde"} href={'/guilde'} icon={'/images/guild.svg'} showActivation/>
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