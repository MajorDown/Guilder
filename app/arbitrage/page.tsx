'use client'
import { useState, useEffect } from 'react';
import { useAdminContext} from "@/contexts/adminContext";
import UINavLink from '@/components/UI/UINavLink';
import LoadSpinner from '@/components/LoadSpinner';
import ContestationArbitrer from '@/components/ContestationArbitrer';

const Arbitrage = () => {
    const { admin } = useAdminContext();
    const [hasCheckedAdmin, setHasCheckedAdmin] = useState(false);

    useEffect(() => {
        setHasCheckedAdmin(true);
    }, [admin])
  return (
    <section id={"arbitrageSection"}>
        <h2>Arbitrage des contestions</h2>
        {!hasCheckedAdmin && <LoadSpinner />}
        {hasCheckedAdmin && !admin && <>
            <p>Vous devez être connecté en tant qu'admin pour accéder à cette page !</p>
            <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
        </>}
        {hasCheckedAdmin && admin && <>
            <p>Statuez ici sur les contestations faites par les membres de la guilde</p>
            <ContestationArbitrer admin={admin} />            
        </>}      
    </section>
  )
}

export default Arbitrage;