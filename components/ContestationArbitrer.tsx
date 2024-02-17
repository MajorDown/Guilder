import getGuildContestations from '@/tools/front/getGuildContestations';
import { ConnectedAdmin, Contestation } from '@/types';
import {useState, useEffect} from 'react';
import LoadSpinner from './LoadSpinner';
import UIButton from './UI/UIButton';
import Image from 'next/image';
import ContestationArbCard from './ContestationArbCard';

export type ContestationArbitrerProps = {
    admin: ConnectedAdmin
}

const ContestationArbitrer = (props : ContestationArbitrerProps) => {
    const [isSearching, setIsSearching] = useState<boolean>(true);
    const [guildContestations, setGuildContestations] = useState<Contestation[] | null>();

    useEffect(() => {   
        const getContestations = async () => {
            const contestations = await getGuildContestations(props.admin);
            console.log(contestations);
            if (contestations) setGuildContestations(contestations);
            else setGuildContestations(null);
        }
        getContestations();
        setIsSearching(false);
    }, [props.admin]); 
    
    return (
        <ul className={"contestationArbitrer"}>
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