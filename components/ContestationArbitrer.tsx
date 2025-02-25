import getGuildContestations from '@/tools/front/getGuildContestations';
import { ConnectedAdmin, Contestation } from '@/types';
import {useState, useEffect} from 'react';
import LoadSpinner from './LoadSpinner';
import ContestationArbCard from './ContestationArbCard';

export type ContestationArbitrerProps = {
    admin: ConnectedAdmin
}

/**
 * @function ContestationArbitrer
 * @description Composant pour l'arbitrage des contestations.
 * @param {ContestationArbitrerProps} props - Les props du composant.
 * @param {ConnectedAdmin} props.admin - L'admin connecté.
 * @returns {JSX.Element} L'arbitrage des contestations.
 */
const ContestationArbitrer = (props : ContestationArbitrerProps) => {
    const [isSearching, setIsSearching] = useState<boolean>(true);
    const [guildContestations, setGuildContestations] = useState<Contestation[] | null>();

    useEffect(() => {   
        const getContestations = async () => {
            const contestations = await getGuildContestations(props.admin);
            if (contestations) setGuildContestations(contestations);
            else setGuildContestations(null);
        }
        getContestations();
        setIsSearching(false);
    }, [props.admin]); 
    
    return (
        <ul id={"contestationArbitrer"}>
            {isSearching ? <LoadSpinner message={"Chargement des contestations en cours..."}/> : <>
                {guildContestations && <>
                    {guildContestations.map((contestation: Contestation, index: number) => {
                        return (<ContestationArbCard key={index} contestation={contestation} />)
                    })}
                </>}
                {guildContestations === null && <p>Aucune contestation en attente de jugement</p>}
            </>}
        </ul>
  )
}

export default ContestationArbitrer;