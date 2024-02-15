import {useEffect, useState} from 'react';
import { ConnectedMember, Contestation } from '@/types';
import getMemberContestations from '@/tools/front/getMemberContestations';

export type ContestationListerProps = {
    member: ConnectedMember;
}

const ContestationLister = (props : ContestationListerProps) => {
    const [yourContestations, setYourContestations] = useState<Contestation[] | null>(null);
    const [othersContestations, setOthersContestations] = useState<Contestation[] | null>(null);

    useEffect(() => {
        if (!props.member) return;
    
        const getContestations = async () => {
            const contestations = await getMemberContestations(props.member);
            console.log("Contestations récupérées :", contestations);
            if (contestations) {
                // Contestations où le membre est le contester
                const memberContestation = contestations.filter((contestation: Contestation) => contestation.contester === props.member.name);
                setYourContestations(memberContestation);
                console.log("Vos contestations :", memberContestation);
    
                // ContestationDates uniques des contestations déjà ajoutées
                const addedContestationDates = new Set(memberContestation.map((contestation: Contestation) => contestation.contestationDate));
    
                // Contestations où le membre est worker ou payer, mais pas déjà inclus
                const restOfContestations = contestations.filter((contestation: Contestation) => {
                    return (contestation.contestedIntervention.worker === props.member.name || contestation.contestedIntervention.payer === props.member.name) && !addedContestationDates.has(contestation.contestationDate);
                });
                setOthersContestations(restOfContestations);
                console.log("Autres contestations :", restOfContestations);
            }
        }
        getContestations();
    }, [props.member]);  
    
    return (
        <div className={"contestationLister"}>
            <h3>Liste des contestations vous concernant</h3>
            {yourContestations && <>
                <p>Vos propres contestations :</p>
                <ul>
                    {yourContestations.map((contestation: Contestation, index: number) => {
                        return (
                            <li key={index}>
                                <p>Contestation du {contestation.contestationDate} concernant l'intervention du {contestation.contestedIntervention.interventionDate} :</p>
                                <p>{contestation.contesterMessage}</p>
                            </li>
                        )
                    })}
                </ul>
            </>}
            {yourContestations === null && <p>Vous n'avez pas de contestations en cours</p>}
            {othersContestations && <>
                <p>Liste des contestations concernant vos déclarations :</p>
                <ul>
                    {othersContestations.map((contestation: Contestation, index: number) => {
                        return (
                            <li key={index}>
                                <p>Contestation du {contestation.contestationDate} concernant l'intervention du {contestation.contestedIntervention.interventionDate} :</p>
                                <p>{contestation.contesterMessage}</p>
                            </li>
                        )
                    })}
                </ul>
            </>}
            {othersContestations === null && <p>Personne n'a contesté vos déclarations</p>}

        </div>
  )
}

export default ContestationLister;