'use client'
import { useState, useEffect } from 'react';
import { useAdminContext} from "@/contexts/adminContext";
import UINavLink from '@/components/UI/UINavLink';
import LoadSpinner from '@/components/LoadSpinner';
import MembersManager from '@/components/MembersManager';

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

    return (
      <section id="MembersSection">
        <h2>Les membres de la Guilde</h2>
        {!hasCheckedAdmin && <LoadSpinner />}
        {hasCheckedAdmin && admin && <>
            <p>Checkez ici le statut des membres, et gerez leur inscription / suppression</p>
            <MembersManager admin={admin}/>
        </>}
        {hasCheckedAdmin && !admin && <>
            <p>Vous devez être connecté en tant qu'admin pour accéder à cette page !</p>
            <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
        </>}
      </section>
    )
  }
  
  export default Membres;