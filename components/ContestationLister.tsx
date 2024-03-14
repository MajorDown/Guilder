import {useEffect, useState} from 'react';
import { ConnectedMember, Contestation } from '@/types';
import getMemberContestations from '@/tools/front/getMemberContestations';
import ContestationCard from './ContestationCard';
import LoadSpinner from './LoadSpinner';

export type ContestationListerProps = {
    member: ConnectedMember;
}

/**
 * @function ContestationLister
 * @description Composant pour lister les contestations d'un membre.
 * @param {ContestationListerProps} props - Les props du composant.
 * @param {ConnectedMember} props.member - Le membre connecté.
 * @returns {JSX.Element} La liste des contestations du membre.
 */
const ContestationLister = (props : ContestationListerProps) => {
    const [isSearching, setIsSearching] = useState<boolean>(true);
    const [yourContestations, setYourContestations] = useState<Contestation[] | null>();
    const [othersContestations, setOthersContestations] = useState<Contestation[] | null>();

    useEffect(() => {   
        const getContestations = async () => {
            const contestations = await getMemberContestations(props.member);
            if (contestations) {
                const memberContestation = contestations.filter((contestation: Contestation) => contestation.contester === props.member.name);
                setYourContestations(memberContestation);
                const addedContestationDates = new Set(memberContestation.map((contestation: Contestation) => contestation.contestationDate));
                const restOfContestations = contestations.filter((contestation: Contestation) => {
                    return (contestation.contestedIntervention.worker === props.member.name || contestation.contestedIntervention.payer === props.member.name) && !addedContestationDates.has(contestation.contestationDate);
                });
                setOthersContestations(restOfContestations);
            }
            else {
                setYourContestations(null);
                setOthersContestations(null);
            }
        }
        getContestations();
        setIsSearching(false);
    }, [props.member]);  
    
    return (
        <div id={"contestationLister"}>
            <h3>Liste des contestations vous concernant</h3>
            {isSearching ? <LoadSpinner message={"Chargement des contestations en cours..."}/> : <>
                {yourContestations && <>
                    <p>Vos propres contestations :</p>
                    <ul>
                        {yourContestations.map((contestation: Contestation, index: number) => {
                            return (<ContestationCard key={index} contestation={contestation} />)
                        })}
                    </ul>
                </>}
                {yourContestations === null && <p>Vous n'avez pas de contestations en cours</p>}
                {othersContestations && <>
                    <p>Contestations concernant vos déclarations :</p>
                    <ul>
                        {othersContestations.map((contestation: Contestation, index: number) => {
                            return (<ContestationCard key={index} contestation={contestation} />)
                        })}
                    </ul>
                </>}
                {othersContestations === null && <p>Personne n'a contesté vos déclarations</p>}
            </>}
        </div>
  )
}

export default ContestationLister;