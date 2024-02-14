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
            if (contestations) {
                const memberContestation = contestations.filter((contestation: Contestation) => contestation.contester === props.member.name);
                setYourContestations(memberContestation);
                const restOfContestations = contestations.filter((contestation: Contestation) => contestation.contestedIntervention.worker == props.member.name);
                setOthersContestations(restOfContestations);
            }
        }
        getContestations();
    }, [props.member])
    
    
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

        </div>
  )
}

export default ContestationLister;