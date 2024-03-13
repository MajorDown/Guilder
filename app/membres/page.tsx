'use client'
import { useState, useEffect } from 'react';
import { useAdminContext} from "@/contexts/adminContext";
import UINavLink from '@/components/UI/UINavLink';
import LoadSpinner from '@/components/LoadSpinner';
import MembersManager from '@/components/MembersManager';
import PageLogo from '@/components/PageLogo';
import AppNavbar from '@/components/AppNavbar';

/**
 * @module Membres
 * 
 * Nécessite d'être connecté en tant qu'admin pour accéder à cette page.
 */
const Membres = () => {
    const { admin } = useAdminContext();
    const [hasCheckedAdmin, setHasCheckedAdmin] = useState(false);

    useEffect(() => {
        setHasCheckedAdmin(true);
    }, [admin])

    return (<>
      <section className={"section_left"}>
        <div id={"section_navigation"} className={"section_content"}>
          <PageLogo pseudoTitle='Membres'/>
          <AppNavbar />
        </div>
      </section>
      <section className={"section_right"}>
        <div id={"section_membres"} className={"section_content"}>
          <h2>Les membres de la Guilde</h2>
          {!hasCheckedAdmin && <LoadSpinner />}
          {hasCheckedAdmin && admin && <>
            <p>Checkez ici le statut des membres, et gerez leur inscription / suppression</p>
            <MembersManager admin={admin}/>
          </>}
          {hasCheckedAdmin && !admin && <>
            <p>Vous devez être connecté en tant qu'admin pour accéder à cette page !</p>
            <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/icons/membre-white-dark.svg'} />
          </>}
        </div>
      </section>
    </>)
}
  
  export default Membres;