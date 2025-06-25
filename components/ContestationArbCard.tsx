import { useState } from 'react';
import { Contestation } from '@/types';
import UIButton from './UI/UIButton';
import Image from 'next/image';
import UINavLink from './UI/UINavLink';

export type ContestationCardProps = {
    contestation: Contestation
}

/**
 * @function ContestationArbCard
 * @description Composant pour une carte de contestation pour l'arbitrage.
 * @param {ContestationCardProps} props - Les props du composant.
 */
const ContestationArbCard = (props: ContestationCardProps) => {
    const [wantDetails, setWantDetails] = useState<boolean>(false);
    
    return (
    <li className={"contestationArbCard"}>
        <div className={"contestationResume"}>
            <p>n°{props.contestation.contestationDate} par : {props.contestation.contester}</p>
            <button onClick={() => setWantDetails(!wantDetails)}>
                <Image className={wantDetails ? "extended" : ""} src={'/images/icons/show-more.svg'} alt={"plus d'information"} width={24} height={24}/>
            </button>
        </div>
        { wantDetails && <>
            <div className={"contestationMessage"}>
                <p>"{props.contestation.contesterMessage}"</p>
            </div>
            <div className={"contestedIntervention"}>
                <div>
                    <p>Voici l'intervention contestée : </p>
                    <p>Intervention n°{props.contestation.contestedIntervention.declarationDate}</p>
                    <p>date de l'intervention : {props.contestation.contestedIntervention.interventionDate}</p>
                    <p>membre intervenant : {props.contestation.contestedIntervention.worker}</p>
                    <p>pour le compte de : {props.contestation.contestedIntervention.payer}</p>
                    <p>nombres d'heures déclarée : {props.contestation.contestedIntervention.hours}</p>
                    <p>avec les options suivantes :</p>
                    {props.contestation.contestedIntervention.options[0] && 
                        props.contestation.contestedIntervention.options.map((option, index: number) => {
                            if (typeof option != 'string') return (<p key={index}>+ {option.option} : x{option.coef}</p>)
                        })}
                    <p>Description de l'intervention : {props.contestation.contestedIntervention.description}</p>
                </div>
                <UINavLink label={"statuer"} href={`/arbitrage/${encodeURIComponent(JSON.stringify(props.contestation))}`} icon={"/images/icons/jugement-green.svg"} />
            </div>
        </>}
    </li>
  )
}

export default ContestationArbCard;