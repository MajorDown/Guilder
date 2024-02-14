'use client'
import {useState, useEffect} from 'react';
import PasswordUpdater from "@/components/PasswordUpdater";
import { useMemberContext } from "@/contexts/memberContext";
import { useAdminContext } from "@/contexts/adminContext";
import UINavLink from '@/components/UI/UINavLink';
import ContestationLister from '@/components/ContestationLister';

/**
 * @module Parameters
 */
const Parameters = () => {
    const {member} = useMemberContext();
    const {admin} = useAdminContext();
    const [checkedLogin, setCheckedLogin] = useState(false);

    useEffect(() => {
      setCheckedLogin(true);
    }, [admin, member])

  return (
    <section id="parametersSection">
        <h2>Paramètres de votre compte</h2>
        {checkedLogin && !admin && !member && <>
            <p>Vous devez être connecté pour accéder à cette page !</p>
            <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
        </>}
        {(admin || member) && (<div>
            <PasswordUpdater 
              status={admin ? "admin" : "member"} 
              user={{
                  mail: admin?.mail || member?.mail,
                  token: admin?.token || member?.token
              }} 
            />
        </div>)}
        {member && <>
            <ContestationLister member={member} />
        </>}

    </section>
  )
}

export default Parameters;
