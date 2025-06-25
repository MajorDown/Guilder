'use client'
import { useEffect, useState } from "react";
import { useMemberContext } from "@/contexts/memberContext"
import UINavLink from "@/components/UI/UINavLink";
import { Intervention } from "@/types";
import ContestationForm from "@/components/ContestationForm";
import AppNavbar from "@/components/AppNavbar";
import PageLogo from "@/components/PageLogo";

export type ContestationProps = {
    params: {intervention: string}
}

const Contestation = (props: ContestationProps) => {
    const [interventionToContest, setInterventionToContest] = useState<Intervention>();
    const { member } = useMemberContext();
    const [checkedMember, setCheckedMember] = useState(false);
  
    useEffect(() => {
        setCheckedMember(true);
    }, [member])

    useEffect(() => {
        const decodedParams = decodeURIComponent(props.params.intervention);
        console.log(JSON.parse(decodedParams));
        try {
            const parsed = JSON.parse(decodedParams);
            setInterventionToContest(parsed as Intervention);
        } catch (error) {
            console.error("Erreur lors du parsing de l'intervention:", error);
        }
    }, [props.params.intervention])

    return (<>
        <section className={"section_left"}>
            <div id={"section_navigation"} className={"section_content"}>
                <PageLogo pseudoTitle='Contestation'/>
                <AppNavbar />
            </div>
        </section>
        <section className={"section_right"}>
            <div id="section_contestation" className={"section_content"}>
                <h2>Envoyer une contestation</h2>
                {checkedMember && !member && <>
                    <p>Vous devez être connecté pour accéder à cette page !</p>
                    <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/membre-white-dark.svg'} />
                </>}
                {checkedMember && member && <>
                    <p>Vous avez constaté une erreur dans cette déclaration ?</p>
                    <p>Vous avez la possibilité de la contester si celle-ci date de maximum 48h.</p>
                    {interventionToContest && <ContestationForm contestedIntervention={interventionToContest} member={member} />}
                </>} 
            </div>
        </section>
    </>)
}

export default Contestation;