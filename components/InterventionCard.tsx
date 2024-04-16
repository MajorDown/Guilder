import { useState, useEffect } from "react";
import { ConnectedAdmin, ConnectedMember, Intervention, UserStatus } from "@/types";
import UIButton from "./UI/UIButton";
import Image from "next/image";
import UINavLink from "./UI/UINavLink";

type interventionCardProps = {
    intervention: Intervention,
    role: UserStatus
    user: ConnectedMember | ConnectedAdmin;

}

/**
 * @function InterventionCard
 * @description Composant pour une carte d'intervention.
 * @param {interventionCardProps} props - Les props du composant.
 * @param {Intervention} props.intervention - L'intervention à afficher.
 * @param {UserStatus} props.role - Le rôle de l'utilisateur.
 * @param {ConnectedMember | ConnectedAdmin} props.user - L'utilisateur connecté.
 * @returns {JSX.Element} Une carte d'intervention.
 */
const InterventionCard = (props: interventionCardProps) => {
    const [wantDetails, setWantDetails] = useState(false);
    const [dateDisplay, setDateDisplay] = useState<string>();
    const [logDisplay, setLogDisplay] = useState<string>();
    const [declarationDateDisplay, setDeclarationDateDisplay] = useState<string>();
    const [creditDisplay, setCreditDisplay] = useState<string>();
    const [isTooLate, setIsTooLate] = useState<boolean>(false); // si declarationDate est plus vieux que 48h, setIsTooLate(true)
    
    useEffect(() => {
        // FORMATTAGE DE DATEDISPLAY AU FORMAT "DD-MM-YY"
        const dateParts = props.intervention.interventionDate.split("-");
        const newDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0].substring(2)}`;
        setDateDisplay(newDate);
        // FORMATTAGE DE LOGDISPLAY
        const log = `${props.intervention.worker} a travaillé ${props.intervention.hours}H pour ${props.intervention.payer}`;
        setLogDisplay(log);
        // FORMATTAGE DE DECLARATIONDATEDISPLAY AU FORMAT "déclaré le DD-MM-YY à HH:MM"
        const declarationDateParts = props.intervention.declarationDate.split("-");
        const declarationDate = `déclaré le ${declarationDateParts[2]}-${declarationDateParts[1]}-${declarationDateParts[0].substring(2)} à ${declarationDateParts[3]}:${declarationDateParts[4]}`;
        setDeclarationDateDisplay(declarationDate);
        // CALCUL DE CREDITDISPLAY
        let totalCredits:number = 0; // Démarre avec le nombre d'heures
        props.intervention.options.forEach((option) => {
            if (typeof option === 'object') totalCredits += (props.intervention.hours * option.coef) as number; // Ajoute les crédits supplémentaires basés sur chaque coef d'option
        });
        setCreditDisplay(`${props.intervention.payer === props.user.name ? '-': ''}${totalCredits.toFixed(2)}`);
        // CALCUL DE ISTOOLATE
        // Conversion de declarationDate en objet Date
        const declarationDateTimeParts = props.intervention.declarationDate.split('-');
        const formattedDeclarationDate = new Date(Date.UTC(
            parseInt(declarationDateTimeParts[0], 10), // Année
            parseInt(declarationDateTimeParts[1], 10) - 1, // Mois, ajusté pour l'indexation à partir de 0
            parseInt(declarationDateTimeParts[2], 10), // Jour
            parseInt(declarationDateTimeParts[3], 10), // Heures
            parseInt(declarationDateTimeParts[4], 10), // Minutes
            parseInt(declarationDateTimeParts[5], 10), // Secondes
            parseInt(declarationDateTimeParts[6], 10) // Millisecondes
        ));
        // Calcul de la différence avec la date actuelle
        const now = new Date();
        const diff = now.getTime() - formattedDeclarationDate.getTime(); // Différence en millisecondes
        // Vérification si la différence dépasse 48 heures (48 heures * 60 minutes * 60 secondes * 1000 millisecondes)
        setIsTooLate(diff > 48 * 60 * 60 * 1000);
    }, [props.intervention]);


    return (
    <li className={"interventionCard"}>
        <div className={"interventionCardResume"}>
            <p className={"interventionDate"}>{dateDisplay}</p>
            <p className={"interventionLog"}>{logDisplay}</p>
            <p className={"interventionCredit"} style={{color: props.intervention.payer === props.user.name ? 'red' : ''}}>{creditDisplay}</p>
            <button onClick={() => setWantDetails(!wantDetails)}>
                <Image className={wantDetails ? "extended" : ""} src={"images/icons/show-more.svg"} alt={"détail de la déclaration"} width={20} height={20}/>
            </button>
        </div>
        {wantDetails && <div className={"interventionDetails"}>
            <div className={"interventionDescAndOptions"}>
                <p>{declarationDateDisplay}</p>
                <p>description : "{props.intervention.description}"</p>
                {props.intervention.options[0] ? <p>options déclarées :</p> : <p>pas d'options déclarées</p>}
                {props.intervention.options?.map((option, index) => typeof option === 'object' && (<p key={index}>+ {option.option} (x{option.coef})</p>))}
                {props.intervention.imagesUrls?.map((url, index) => <Image key={index} src={url} alt={"image de l'intervention"} width={200} />)}
            </div>
            {!isTooLate && <UINavLink label={"Signaler une erreur"} href={`/contestation/create/${encodeURIComponent(JSON.stringify(props.intervention))}`} icon={"/images/icons/signaler.svg"} />}
        </div>}
    </li>
  )
}

export default InterventionCard;