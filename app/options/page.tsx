'use client'
import {useState, useEffect} from 'react';
import PasswordUpdater from "@/components/PasswordUpdater";
import { useMemberContext } from "@/contexts/memberContext";
import { useAdminContext } from "@/contexts/adminContext";
import UINavLink from '@/components/UI/UINavLink';
import ContestationLister from '@/components/ContestationLister';
import NewAdminForm from '@/components/NewAdminForm';
import PageLogo from '@/components/PageLogo';
import AppNavbar from '@/components/AppNavbar';
import AuthPersistenceManager from '@/components/AuthPersistenceManager';
import ReinitCountsForm from '@/components/ReinitCountsForm';

/**
 * @module Parameters
 */
const Options = () => {
    const {member} = useMemberContext();
    const {admin} = useAdminContext();
    const [checkedLogin, setCheckedLogin] = useState(false);
    const [selectedTab, setSelectedTab] = useState<"password" | "contestation" | "addNewAdmin" | "authPersistence" | "reinitCounts" | null>(null);

    useEffect(() => {
      setCheckedLogin(true);
    }, [admin, member])

  return (<>
    <section className={"section_left"}>
        <div id={"section_navigation"} className={"section_content"}>
          <PageLogo pseudoTitle='Outils'/>
          <AppNavbar />
        </div>
      </section>
    <section className={"section_right"}>
      <div id="section_options" className={"section_content"}>
        <h2>Options et Paramètres</h2>
        {checkedLogin && !admin && !member && <>
            <p>Vous devez être connecté pour accéder à cette page !</p>
            <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/icons/membre-white-dark.svg'} />
        </>}
        {(admin || member) && (<>
            <p>Que souhaitez-vous faire ?</p>
            <div className={"tabsLister"}>
              {member && <button className={selectedTab === "contestation" ? "green" : "light"} onClick={() => setSelectedTab("contestation")}>
                Consulter mes contestations
              </button>}
              {admin && <button className={selectedTab === "addNewAdmin" ? "green" : "light"} onClick={() => setSelectedTab("addNewAdmin")}>
                Ajouter un nouvel admin
              </button>}
              {admin && <button className={selectedTab === "authPersistence" ? "green" : "light"} onClick={() => setSelectedTab("authPersistence")}>
                Gérer votre authentification
              </button>}
              <button className={selectedTab === "password" ? "green" : "light"} onClick={() => setSelectedTab("password")}>Modifier mon mot de passe</button>
              {admin && <button className={selectedTab === "reinitCounts" ? "green" : "light"} onClick={() => setSelectedTab("reinitCounts")}>
                Réinitialiser les compteurs
              </button>}
            </div>
            {selectedTab === "password" && <PasswordUpdater 
              status={admin ? "admin" : "member"} 
              user={{
                mail: admin?.mail || member?.mail,
                token: admin?.token || member?.token
              }} 
            />}
            {member && selectedTab === "contestation" && <ContestationLister member={member} />}  
            {admin && selectedTab === "addNewAdmin" && <NewAdminForm actualAdmin={admin} />}
            {admin && selectedTab === "authPersistence" && <AuthPersistenceManager />}  
            {admin && selectedTab === "reinitCounts" && <ReinitCountsForm />} 
        </>)}
      </div>
    </section>
  </>)
}

export default Options;
