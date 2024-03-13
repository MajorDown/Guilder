'use client'
import { useState, useEffect } from 'react';
import { useAdminContext} from "@/contexts/adminContext";
import UINavLink from '@/components/UI/UINavLink';
import ConfigManager from '@/components/ConfigManager';
import LoadSpinner from '@/components/LoadSpinner';
import PageLogo from '@/components/PageLogo';
import AppNavbar from '@/components/AppNavbar';

/**
 * @module Config
 * 
 * Nécessite d'être connecté en tant qu'admin pour accéder à cette page.
 */
const Config = () => {
    const { admin } = useAdminContext();
    const [hasCheckedAdmin, setHasCheckedAdmin] = useState(false);

    useEffect(() => {
        setHasCheckedAdmin(true);
    }, [admin])

    return (<>
      <section className={"section_left"}>
        <div id={"section_navigation"} className={"section_content"}>
          <PageLogo pseudoTitle='Outils'/>
          <AppNavbar />
        </div>
      </section>
      <section className={"section_right"}>
        <div id={"section_config"} className={"section_content"}>
          <h2>Les outils de la Guilde</h2>
          {!hasCheckedAdmin && <LoadSpinner />}
          {hasCheckedAdmin && admin && <>
            <p>Gérez ici les options disponibles lorsqu'un membre déclare une intervention</p>
            <ConfigManager configFor={admin}/>
          </>}
          {hasCheckedAdmin && !admin && <>
            <p>Vous devez être connecté en tant qu'admin pour accéder à cette page !</p>
            <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
          </>}
        </div>
      </section>
    </>
    )
  }
  
  export default Config;