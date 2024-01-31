'use client'
import { useState, useEffect } from 'react';
import { useAdminContext} from "@/contexts/adminContext";
import UINavLink from '@/components/UI/UINavLink';

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

    return (
      <section id="ConfigSection">
        <h2>Les outils de la Guilde</h2>
        {hasCheckedAdmin && admin && <>
            <p>Gérez ici les options disponibles lorsqu'un membre déclare une intervention</p>
        </>}
        {hasCheckedAdmin && !admin && <>
            <p>Vous devez être connecté en tant qu'admin pour accéder à cette page !</p>
            <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
        </>}
      </section>
    )
  }
  
  export default Config;