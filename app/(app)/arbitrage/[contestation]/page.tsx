'use client'
import { useState, useEffect } from 'react';
import { useAdminContext} from "@/contexts/adminContext";
import { Contestation } from '@/types';
import UINavLink from '@/components/UI/UINavLink';
import InterventionModifier from '@/components/ContestationModifier';
import AppNavbar from '@/components/AppNavbar';
import PageLogo from '@/components/PageLogo';

export type ModificationProps = {
    params: {contestation: string}
}

const Modification = (props: ModificationProps) => {
    const {admin} = useAdminContext();
    const [checkedAdmin, setCheckedAdmin] = useState(false);
    const [contestation, setContestation] = useState<Contestation>();

    useEffect(() => {
        setCheckedAdmin(true);
    }, [admin])
    
    useEffect(() => {
        const decodedParams = decodeURIComponent(props.params.contestation);
        console.log(JSON.parse(decodedParams));
        try {
            const parsed = JSON.parse(decodedParams);
            setContestation(parsed as Contestation);
        } catch (error) {
            console.error("Erreur lors du parsing de la contestation:", error);
        }
    }, [props.params.contestation])

    return (<>
        <section className={"section_left"}>
            <div id={"section_navigation"} className={"section_content"}>
                <PageLogo pseudoTitle='Arbitrage'/>
                <AppNavbar />
            </div>
        </section>
        <section className={"section_right"}>
            <div id={"section_contest_checker"} className={"section_content"}>
                <h2>Modification de l'intervention</h2>
                <p>Statuez ici sur les contestations faites par les membres de la guilde</p>
                {checkedAdmin && !admin && <>
                    <p>Vous devez être connecté pour accéder à cette page !</p>
                    <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
                </>}
                {checkedAdmin && admin && contestation &&
                    <InterventionModifier admin={admin} contestation={contestation} />
                } 
            </div>
        </section>
    </>)
}

export default Modification;