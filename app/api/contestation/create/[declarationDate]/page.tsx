import { useEffect, useState } from "react";
import { useMemberContext } from "@/contexts/memberContext"
import UINavLink from "@/components/UI/UINavLink";

export type ContestationProps = {
    params: {declarationDate: string}
}

const Contestation = (props: ContestationProps) => {
    const { member } = useMemberContext();
    const [checkedMember, setCheckedMember] = useState(false);
  
    useEffect(() => {
        setCheckedMember(true);
    }, [member])

    return (
        <section id={"contestationSection"}>
            <h2>Envoyer une contestation ?</h2>
            {checkedMember && !member && <>
                <p>Vous devez être connecté pour accéder à cette page !</p>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
            </>}
            {checkedMember && member && <>
                <p>Vous avez constaté une erreur dans une déclaration ?</p>
                <p>Vous avez la possibilité de la contester si celle-ci date de maximum 48h.</p>
            </>}            
        </section>
    )
}