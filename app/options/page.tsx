'use client'
import {useState, useEffect} from 'react';
import PasswordUpdater from "@/components/PasswordUpdater";
import { useMemberContext } from "@/contexts/memberContext";
import { useAdminContext } from "@/contexts/adminContext";
import UINavLink from '@/components/UI/UINavLink';
import ContestationLister from '@/components/ContestationLister';
import UIButton from '@/components/UI/UIButton';

/**
 * @module Parameters
 */
const Parameters = () => {
    const {member} = useMemberContext();
    const {admin} = useAdminContext();
    const [checkedLogin, setCheckedLogin] = useState(false);
    const [selectedTab, setSelectedTab] = useState<"password" | "contestation" | null>(null);

    useEffect(() => {
      setCheckedLogin(true);
    }, [admin, member])

  return (
    <section id="parametersSection">
        <h2>Paramètres</h2>
        {checkedLogin && !admin && !member && <>
            <p>Vous devez être connecté pour accéder à cette page !</p>
            <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
        </>}
        {(admin || member) && (<div>
            <p>Que souhaitez-vous faire ?</p>
            <div className={"tabsLister"}>
              {member && <UIButton onClick={() => setSelectedTab("contestation")}>Consulter mes contestations</UIButton>}
              <UIButton onClick={() => setSelectedTab("password")}>Modifier mon mot de passe</UIButton>
            </div>
            <div>
              {selectedTab === "password" && <PasswordUpdater 
                status={admin ? "admin" : "member"} 
                user={{
                  mail: admin?.mail || member?.mail,
                  token: admin?.token || member?.token
                }} 
              />}
              {member && selectedTab === "contestation" && <ContestationLister member={member} />}
            </div>
        </div>)}
    </section>
  )
}

export default Parameters;
