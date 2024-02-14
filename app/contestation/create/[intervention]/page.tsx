'use client'
import { useEffect, useState } from "react";
import { useMemberContext } from "@/contexts/memberContext"
import UINavLink from "@/components/UI/UINavLink";
import { Intervention } from "@/types";
import ContestationForm from "@/components/ContestationForm";

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

    return (
        <section id={"contestationSection"}>
            <h2>Envoyer une contestation</h2>
            {checkedMember && !member && <>
                <p>Vous devez être connecté pour accéder à cette page !</p>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
            </>}
            {checkedMember && member && <>
                <p>Vous avez constaté une erreur dans cette déclaration ?</p>
                <p>Vous avez la possibilité de la contester si celle-ci date de maximum 48h.</p>
                {interventionToContest && <ContestationForm contestedIntervention={interventionToContest} member={member} />}
            </>}          
        </section>
    )
}

export default Contestation;