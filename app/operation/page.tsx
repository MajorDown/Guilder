'use client'
import createOperation from '@/requests/createOperation';
import { OperationPoints, UserName, isFormatted, operationDateFormat } from '@/types'
import {useState, useEffect, FormEvent} from 'react';

const Operation = () => {
    const [payer, setPayer] = useState<UserName | "">("");
    const [payerError, setPayerError] = useState<string>("");
    const [points, setPoints] = useState<OperationPoints>(0);
    const [pointsError, setPointsError] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [workNature, setWorkNature] = useState<string>("");
    const [confirm, setConfirm] = useState<boolean>(false);

    // INITIALISATION DE LA DATE
    useEffect(() => {
        const currentDate: string = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, [])

    // PAYER
    const handlePayer = (value: UserName) => {
        if (payerError) setPayerError("");
        setPayer(value)
    }

    // POINTS
    const handlePoints = (value: OperationPoints) => {
        if (pointsError) setPointsError("");
        setPoints(value)
    }

    // DATE
    const handleDate = (value: string) => {
        if (isFormatted(value, operationDateFormat)) setDate(value);
    }

    // SUBMIT
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (payer === "") setPayerError("Veuillez choisir un bénéficiaire avant de valider")
        if (points <= 0) setPointsError("Veuillez renseigner un nombre d'heure effectuées correct avant de valider");
        if (payer && points && date) {
            const formData = new FormData();
            formData.append("payer", payer);
            formData.append("points", points.toString());
            formData.append("date", date);
            formData.append("workNature", workNature);
            formData.append("confirm", confirm.toString());
            const response = createOperation(formData);
            console.log(response);
        }
    }

  return (
    <section>
        <h2>Déclarer une nouvelle opération</h2>
        <form id="operationForm" onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor="payerInput">Pour quel membre de la guilde avez-vous oeuvré ?</label>
            <div className="inputWrapper" >
                <select 
                    id="payerInput" 
                    value={payer} 
                    onChange={(event) => handlePayer(event.target.value)}
                    >
                    <option value={""}>Choisissez le bénéficiaire</option>
                    <option value="Pierre">Pierre</option>
                    <option value="Jean">Jean</option>
                    <option value="Baptiste">Baptiste</option>
                    <option value="Roger">Roger</option>
                </select>           
                {payerError && <p>{payerError}</p>}
            </div>
            <label htmlFor="pointsInput">Combien d'heures avez-vous effectué ?</label>
            <div className="inputWrapper">
                <input 
                    type="number" 
                    name="points" 
                    id="pointsInput" 
                    value={points} 
                    onChange={(event) => handlePoints(parseInt(event.target.value, 10))} 
                />
                {pointsError && <p>{pointsError}</p>}
            </div>
            <label htmlFor="">A quelle date avez-vous réalisé ses heures ?</label>
            <div  className="inputWrapper">
                <input 
                    type="date" 
                    name="date" 
                    id="dateInput" 
                    value={date} 
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
            <label htmlFor="">en cochant cette case, vous confirmez que l'ensemble des informations
                fournis dans ce formulaire sont correct
                <input 
                    type="checkbox" 
                    name="confirm" 
                    id="confirmInput" 
                    checked={confirm} 
                    onChange={() => setConfirm(!confirm)} 
                    required/>
            </label>
            <button type="submit">Déclarer l'opération</button>
        </form>
    </section>
  )
}

export default Operation;