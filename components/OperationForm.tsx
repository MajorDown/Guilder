'use client'
import {useState, useEffect, FormEvent} from 'react';
import { Operation, OperationPoints, UserName, isFormatted, operationDateFormat } from '@/types'
import createOperation from '@/tools/front/createOperation';
import { useUserContext } from '@/contexts/userContext';
import { useGuildContext } from '@/contexts/guildContext';

const OperationForm = () => {
    const {user} = useUserContext();
    const {members} = useGuildContext();
    const [payer, setPayer] = useState<UserName | "">("");
    const [payerError, setPayerError] = useState<string>("");
    const [points, setPoints] = useState<OperationPoints>(1);
    const [pointsError, setPointsError] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [minDate, setMinDate] = useState<string>();
    const [workNature, setWorkNature] = useState<string>("");
    const [confirm, setConfirm] = useState<boolean>(false);

    useEffect(() => {
        const currentDate= new Date(); 
        setDate(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() - 7); // Retirer 7 jours pour la date minimale
        setMinDate(currentDate.toISOString().split('T')[0]);
    }, []);

    const handlePayer = (value: UserName) => {
        if (payerError) setPayerError("");
        setPayer(value)
    }

    const handlePoints = (value: OperationPoints) => {
        if (pointsError) setPointsError("");
        if (value >= 1 && value <= 24) setPoints(value);
    }

    const handleDate = (value: string) => {
        if (isFormatted(value, operationDateFormat)) setDate(value);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (payer === "") setPayerError("Veuillez choisir un bénéficiaire avant de valider")
        if (points < 1 && points >24) setPointsError("Veuillez renseigner un nombre d'heure effectuées correct avant de valider");
        if (user && !payerError && !pointsError && date) {
            const request: Operation = {
                declarationDate: new Date(),
                date: date,
                worker: user?.name,
                payer: payer,
                points: points,
                nature: workNature
            }
            const response = createOperation(request, user.token);
            console.log(response);
        }
    }

  return (
    <form id="operationForm" onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="payerInput">Pour quel membre de la guilde avez-vous oeuvré ?</label>
        <div className="inputWrapper" >
            <select 
                id="payerInput" 
                value={payer} 
                onChange={(event) => handlePayer(event.target.value)}
                >
                <option value={""}>Choisissez le bénéficiaire</option>
                {members && members.map((member, index) => {
                    if ( user && member.mail != user.mail) return (<option key={index} value={member.name}>{member.name}</option>)
                }
                )}
            </select>           
            {payerError && <p>{payerError}</p>}
        </div>
        <label htmlFor="pointsInput">Combien d'heures avez-vous effectué ?</label>
        <div className="inputWrapper">
            <input 
                type="number" 
                name="points" 
                id="pointsInput" 
                min={0}
                max={24}
                value={points} 
                onChange={(event) => handlePoints(parseInt(event.target.value, 10) as unknown as OperationPoints) }
            />
            {pointsError && <p>{pointsError}</p>}
        </div>
        <label htmlFor="dateinput">
            <p>A quelle date avez-vous réalisé ses heures ?</p>
            <p>(Vous ne pouvez pas déclarer une opération datant de plus d'une semaine)</p>
        </label>
        <div  className="inputWrapper">
            <input 
                type="date" 
                name="date" 
                id="dateInput" 
                value={date} 
                min={minDate}
                max={date}
                onChange={(event) => handleDate(event.target.value)} 
                required
            />
        </div>
        <label htmlFor="natureInput">souhaitez-vous décrire ici votre oeuvre ? (facultatif)</label>
        <textarea 
            name="nature" 
            id="natureInput" 
            cols={30} rows={5} 
            value={workNature} 
            onChange={(event) => setWorkNature(event.target.value)}></textarea>
        <label htmlFor="">
            <input 
                type="checkbox" 
                name="confirm" 
                id="confirmInput" 
                checked={confirm} 
                onChange={() => setConfirm(!confirm)} 
                required/>
            en cochant cette case, vous confirmez que l'ensemble des informations
            fournis dans ce formulaire sont correct : 
        </label>
        <button type="submit">Déclarer l'opération</button>
    </form>
  )
}

export default OperationForm;