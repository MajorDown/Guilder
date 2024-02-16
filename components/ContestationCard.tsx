import { useState } from 'react';
import { Contestation } from '@/types';
import UIButton from './UI/UIButton';
import Image from 'next/image';

export type ContestationCardProps = {
    contestation: Contestation
}

const ContestationCard = (props: ContestationCardProps) => {
    const [wantDetails, setWantDetails] = useState<boolean>(false);
    
    return (
    <li className={"contestationCard"}>
        <div className={"contestationResume"}>
            <div className={"contestationDate"}>
                <p>Contestation n°</p>
                <p>{props.contestation.contestationDate}</p>
            </div>
            <div className={"contester"}>
                <p>Contesté par</p>
                <p>{props.contestation.contester}</p>
            </div>
            <div className={"adminStatus"}>
                <p>Statut</p>
                <p>{props.contestation.adminConclusion}</p>
            </div>
            <UIButton onClick={() => setWantDetails(!wantDetails)}>
                <Image src={wantDetails ? '/images/minimize.svg' : '/images/analyse.svg'} alt={"plus d'information"} width={24} height={24}/>
            </UIButton>
        </div>
        { wantDetails && <>
            <div className={"contestationDetails"}>
                <div className={"worker"}>
                    <p>Déclaré par :</p>
                    <p>{props.contestation.contestedIntervention.worker}</p>
                </div>
                <div className={"payer"}>
                    <p>au profit de :</p>
                    <p>{props.contestation.contestedIntervention.payer}</p>
                </div>
                <div className={"description"}>
                    <p>nombre d'heures déclarées :</p>
                    <p>{props.contestation.contestedIntervention.hours}</p>
                </div>
            </div>
            <div className={"contestationDescription"}>
                <p>Description de l'intervention :</p>
                <p>{props.contestation.contestedIntervention.description}</p>

            </div>
        </>}
    </li>
  )
}

export default ContestationCard;