'use client'
import { OperationPoints, UserName, isFormatted, operationDateFormat } from '@/types'
import {useState, useEffect} from 'react';

const Operation = () => {
    const [payer, setPayer] = useState<UserName | "none">("none");
    const [points, setPoints] = useState<OperationPoints>(1);
    const [date, setDate] = useState<string>("");
    const [workNature, setWorkNature] = useState<string>("");

    const handleDate = (value: string) => {
        if (isFormatted(value, operationDateFormat)) setDate(value)
    }

    useEffect(() => {
        const currentDate: string = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, [])

  return (
    <section>
        <h2>Déclarer une nouvelle opération</h2>
        <form id="operationForm">
            <label htmlFor="payerInput">Pour quel membre de la guilde avez-vous oeuvré ?</label>
            <select id="payerInput" value={payer} onChange={(event) => setPayer(event.target.value)}>
                <option value="none">choisissez le bénéficiaire</option>
                <option value="Pierre">Pierre</option>
                <option value="Jean">Jean</option>
                <option value="Baptiste">Baptiste</option>
                <option value="Roger">Roger</option>
            </select>            
            <label htmlFor="pointsInput">Combien d'heures avez-vous effectué ?</label>
            <input type="number" name="points" id="pointsInput"  value={points} onChange={(event) => setPoints(parseInt(event.target.value, 10))}/>
            <label htmlFor="">A quelle date avez-vous réalisé ses heures ?</label>
            <input type="date" name="date" id="dateInput" value={date} onChange={(event) => handleDate(event.target.value)}/>
            <label htmlFor="">souhaitez-vous décrire ici votre oeuvre ? (facultatif)</label>
            <label htmlFor="">en cochant cette case, vous confirmez que l'ensemble des informations
            fournis dans ce formulaire sont correct</label>
        </form>
    </section>
  )
}

export default Operation