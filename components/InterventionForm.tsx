'use client'
import {useState, useEffect, useRef, FormEvent} from 'react';
import { useRouter } from 'next/navigation';
import { isFormatted, interventionDateFormat } from '@/tools/isFormatted';
import { ConnectedMember, GuildConfig, Intervention, InterventionHours, MembersList, UserInterventions, UserName } from '@/types'
import createIntervention from '@/tools/front/createIntervention';
import { useMemberContext } from '@/contexts/memberContext';
import { dateGenerator } from '@/tools/dateGenerator';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import getGuildConfig from '@/tools/front/getGuildConfig';
import UIButton from './UI/UIButton';

const InterventionForm = () => {
    const {member, updateMember} = useMemberContext();
    const Router = useRouter();
    const [payer, setPayer] = useState<UserName | "">("");
    const [payerError, setPayerError] = useState<string>("");
    const [points, setPoints] = useState<InterventionHours>(1);
    const [pointsError, setPointsError] = useState<string>("");
    // état : tableau des noms d'option checkées
    const [checkedConfigOptions, setCheckedConfigOptions] = useState<string[]>([]);

    const [date, setDate] = useState<string>("");
    const [minDate, setMinDate] = useState<string>();
    const [maxDate, setMaxDate] = useState<string>();
    const [workNature, setWorkNature] = useState<string>("");
    const [confirm, setConfirm] = useState<boolean>(false);
    const [loadError, setLoadError] = useState<string>("");
    const [membersList, setMembersList] = useState<MembersList | null>(null);
    const [hasDeclared, setHasDeclared] = useState<boolean>(false);
    const [configsList, setConfigsList] = useState<GuildConfig | null>(null);

    useEffect(() => {
        const getMembers = async () => {
            if (!member) return;
            const response = await getGuildMembers(member) as MembersList;
            if (response)
                setMembersList(response);
        }
        getMembers();
        const getConfig = async () => {
            if (!member) return;
            const response = await getGuildConfig(member) as GuildConfig;
            if (response) setConfigsList(response);
        };
        getConfig();
    }, [member])

    useEffect(() => {console.log(checkedConfigOptions)}, [checkedConfigOptions])

    const handlePayer = (value: UserName) => {
        if (payerError) setPayerError("");
        setPayer(value)
    }

    const handlePoints = (value: InterventionHours) => {
        if (pointsError) setPointsError("");
        if (value >= 1 && value <= 24) setPoints(value);
    }

    const handlechangeCheckedConfigOptions = (option: string) => {
        switch (checkedConfigOptions.includes(option)) {
            case true:
                setCheckedConfigOptions(checkedConfigOptions.filter((checkedOption) => checkedOption !== option));
                break;
            case false:
                setCheckedConfigOptions([...checkedConfigOptions, option]);
                break;
        }
        // conditionner la className du bouton à la présence de l'option dans le tableau

    }

    const handleDate = (value: string) => {
        if (isFormatted(value, interventionDateFormat)) setDate(value);
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (payer === "") setPayerError("Veuillez choisir un bénéficiaire avant de valider")
        if (points < 1 && points >24) setPointsError("Veuillez renseigner un nombre d'heure effectuées correct avant de valider");
        if (member && !payerError && !pointsError && date) {
            const request: Intervention = {
                declarationDate: dateGenerator("declaration"),
                interventionDate: dateGenerator("intervention"),
                worker: member.name,
                payer: payer,
                hours: points,
                options: [],
                description: workNature
            }
            const response = await createIntervention(request, member.token);
            if (response instanceof Response && response.status === 200) {
                const updatedData = await response.json();
                if (updatedData.worker) {
                    if (member.name === updatedData.worker) {
                        const newMember: ConnectedMember = { ...member, counter: member.counter + updatedData.points } 
                        updateMember(newMember);
                        localStorage.setItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_MEMBERCONTEXT_KEY as string, JSON.stringify(newMember))
                    }
                }
                if (updatedData.payer && membersList) {
                    const newMembers = membersList.map((member) => {
                        if (member.name === updatedData.payer) {
                            return { ...member, counter: member.counter - updatedData.points };
                        }
                        else if (member.name === updatedData.worker) {
                            return { ...member, counter: member.counter + updatedData.points };
                        } 
                        else {
                            return member;
                        }
                    });
                }
                setHasDeclared(true);
            }
            else {
                setLoadError("une erreur est survenue lors de la déclaration. Veuillez réessayer plus tard.")
            }
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
                {membersList && membersList.map((user, index) => {
                    if (member && user && user.mail != member.mail) return (
                        <option key={index} value={member.name}>{member.name}</option>
                    )
                })}
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
                onChange={(event) => handlePoints(parseInt(event.target.value, 10) as unknown as InterventionHours) }
                />
            {pointsError && <p>{pointsError}</p>}
        </div>
        <p>Sélectionnez ici les options / outils que vous avez eu à utiliser :</p>
        <div id={"checkedConfigOptions"}>
            {configsList && configsList.config.map((option, index) => (
                <UIButton
                    type={"button"}
                    key={index}
                    onClick={() => handlechangeCheckedConfigOptions(option.option)}
                    className={checkedConfigOptions.includes(option.option) ? "UIButton checked" : "UIButton"}
                    >
                    {option.option}
                </UIButton>
            ))}
        </div>
        <label htmlFor="dateinput">
            <p>A quelle date avez-vous réalisé ses heures ?</p>
            <p>(Vous ne pouvez pas déclarer une opération datant de plus d'une semaine)</p>
        </label>
        <div className="inputWrapper">
            <input 
                type="date" 
                name="date" 
                id="dateInput" 
                value={date} 
                min={minDate}
                max={maxDate}
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
            fournis dans ce formulaire sont correct !
        </label>
        <button type="submit">Déclarer l'opération</button>
        {loadError && <p>{loadError}</p>}
    </form>
  )
}

export default InterventionForm;