'use client'
import { useEffect, useState } from "react";
import { useMemberContext } from "@/contexts/memberContext"
import UINavLink from "@/components/UI/UINavLink";
import { Intervention } from "@/types";

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
        if (props.params.intervention) setInterventionToContest(JSON.parse(props.params.intervention) as Intervention)     
    }, [props.params.intervention])

    return (
        <section id={"contestationSection"}>
            <h2>Envoyer une contestation</h2>
            {checkedMember && !member && <>
                <p>Vous devez être connecté pour accéder à cette page !</p>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
            </>}
            {checkedMember && member && <>
                <p>Vous avez constaté une erreur dans une déclaration ?</p>
                <p>Vous avez la possibilité de la contester si celle-ci date de maximum 48h.</p>
                <p>Si vous êtes dans ce cas, veuillez remplir le formulaire suivant :</p>
            </>}          
        </section>
    )
}

export default Contestation;