'use client'
import { useAdminContext} from "@/contexts/adminContext";
import ContestationArbitrer from '@/components/ContestationArbitrer';
import PageForAdmin from '@/components/PageForAdmin';

/*
* @module Arbitrage
* 
* Nécessite d'être connecté en tant qu'admin pour accéder à cette page.
*/
const Arbitrage = () => {
    const { admin } = useAdminContext();
    
    return (<PageForAdmin title={'Arbitrage des Contestations'} pseudoTitle={'Arbitrage'} id={'section_arbitrage'}>
        <p>Statuez ici sur les contestations faites par les membres de la guilde</p>
        {admin && <ContestationArbitrer admin={admin} />}   
    </PageForAdmin>)
}

export default Arbitrage;