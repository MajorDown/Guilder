import { useState, useEffect } from "react";
import { ConnectedMember, Intervention, UserName, UserStatus } from "@/types";

type interventionCardProps = {
    intervention: Intervention,
    asUser: UserStatus
}

const InterventionCard = (props: interventionCardProps) => {
    const [dateDisplay, setDateDisplay] = useState<string>();
    const [logDisplay, setLogDisplay] = useState<string>();
    const [creditDisplay, setCreditDisplay] = useState<number>();
    
    useEffect(() => {
        // FORMATTAGE DE INTERVENTIONDATE AU FORMAT DD-MM-YY
        const dateParts = props.intervention.interventionDate.split("-");
        const newDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0].substring(2)}`;
        setDateDisplay(newDate);
        // FORMATTAGE DE LOGDISPLAY
        const log = `${props.intervention.worker} a travaillé ${props.intervention.hours}H pour ${props.intervention.payer}`;
        setLogDisplay(log);
        // CALCUL DE CREDITDISPLAY
        let totalCredits:number = props.intervention.hours; // Démarre avec le nombre d'heures
        props.intervention.options.forEach((option) => {
            totalCredits += (props.intervention.hours * option.coef) as number; // Ajoute les crédits supplémentaires basés sur chaque coef d'option
        });
        setCreditDisplay(parseInt(totalCredits.toFixed(2)));
    }, [props.intervention]);

    return (
    <li className={"interventionCard"}>
        <div className={"interventionCardResume"}>
            <p className={"interventionDate"}>{dateDisplay}</p>
            <p className={"interventionlog"}>{logDisplay}</p>
            <p className={"interventionCredit"}>{creditDisplay}</p>
        </div>
    </li>
  )
}

export default InterventionCard;