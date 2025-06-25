import { useState } from 'react';
import { Contestation } from '@/types';
import UIButton from './UI/UIButton';
import Image from 'next/image';

export type ContestationCardProps = {
    contestation: Contestation
}

/**
 * @function ContestationCard
 * @description Composant pour une carte de contestation.
 * @param {ContestationCardProps} props - Les props du composant.
 * @param {Contestation} props.contestation - La contestation à afficher.
 * @returns {JSX.Element} Une carte de contestation.
 */
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
            <div className={"status"}>
                <p>Statut</p>
                <p>{props.contestation.adminConclusion}</p>
            </div>
            <button onClick={() => setWantDetails(!wantDetails)}>
                <Image className={wantDetails ? "extended" : ""} src={'/images/icons/show-more.svg'} alt={"plus d'information"} width={24} height={24}/>
            </button>
        </div>
        { wantDetails && <>
            <div className={"contestationDetails"}>
                <div className={"worker"}>
                    <p>Déclaration de :</p>
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