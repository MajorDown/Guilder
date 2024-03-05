'use client'
import {useState, useEffect, FormEvent} from 'react';
import { isFormatted, interventionDateFormat } from '@/tools/isFormatted';
import { GuildConfig, Intervention, InterventionHours, MembersList, UserName } from '@/types'
import createIntervention from '@/tools/front/createIntervention';
import { useMemberContext } from '@/contexts/memberContext';
import { dateGenerator } from '@/tools/dateGenerator';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import getGuildConfig from '@/tools/front/getGuildConfig';
import UIButton from './UI/UIButton';
import UINavLink from './UI/UINavLink';

/**
 * @function InterventionForm
 * @description Composant pour un formulaire de déclaration d'intervention.
 * @returns {JSX.Element} Un formulaire de déclaration d'intervention.
 */
const InterventionForm = () => {
    const {member, updateMember} = useMemberContext();
    const [payer, setPayer] = useState<UserName | "">("");
    const [payerError, setPayerError] = useState<string>("");
    const [hours, setHours] = useState<InterventionHours>(1);
    const [hoursError, setHoursError] = useState<string>("");
    const [checkedConfigOptions, setCheckedConfigOptions] = useState<string[]>([]);
    const [date, setDate] = useState<string>("");
    const [minDate, setMinDate] = useState<string>();
    const [maxDate, setMaxDate] = useState<string>();
    const [description, setDescription] = useState<string>("");
    const [confirm, setConfirm] = useState<boolean>(false);
    const [loadError, setLoadError] = useState<string>("");
    const [membersList, setMembersList] = useState<MembersList | null>(null);
    const [hasDeclared, setHasDeclared] = useState<boolean>(false);
    const [configsList, setConfigsList] = useState<GuildConfig | null>(null);

    useEffect(() => {
        const getMembers = async () => {
            if (!member) return;
            const response = await getGuildMembers(member) as MembersList;
            if (response) setMembersList(response);
            if (membersList) {
                let sortedList = membersList.sort((a, b) => a.name.localeCompare(b.name));
                setMembersList(sortedList);
            }
        }
        getMembers();
        const getConfig = async () => {
            if (!member) return;
            const response = await getGuildConfig(member) as GuildConfig;
            if (response) {
                const filteredConfig = response.config.filter(option => option.enabled);
                let sortedList = filteredConfig.sort((a, b) => a.option.localeCompare(b.option));
                setConfigsList({...response, config: sortedList});
            }
        };
        getConfig();
    }, [member]);

    useEffect(() => {
        const today = new Date();
        const minDayDate = new Date(today);
        minDayDate.setDate(today.getDate() - 7); // Définit la date minimum à J-2
        const maxDayDate = new Date(today); // La date maximale est aujourd'hui
    
        // Formate les dates en 'YYYY-MM-DD'
        const formatDateString = (date: Date): string => {
            const year = date.getFullYear();
            let monthValue = date.getMonth() + 1;
            let dayValue = date.getDate();
    
            // Conversion en chaîne avec ajout d'un zéro si nécessaire
            const month = monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
            const day = dayValue < 10 ? `0${dayValue}` : `${dayValue}`;
    
            return `${year}-${month}-${day}`;
        };
    
        setMinDate(formatDateString(minDayDate));
        setMaxDate(formatDateString(maxDayDate));
    }, []);
    

    const handlePayer = (value: UserName) => {
        if (payerError) setPayerError("");
        setPayer(value)
    }

    const handlePoints = (value: InterventionHours) => {
        if (hoursError) setHoursError("");
        if (value >= 1 && value <= 24) setHours(value);
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
    }

    const handleDate = (value: string) => {
        if (isFormatted(value, interventionDateFormat)) setDate(value);
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (payer === "") setPayerError("Veuillez choisir un bénéficiaire avant de valider")
        if (hours < 1 && hours >24) setHoursError("Veuillez renseigner un nombre d'heure effectuées correct avant de valider");
        if (member && !payerError && !hoursError && date) {
            const request: Intervention = {
                declarationDate: dateGenerator("declaration"),
                interventionDate: date,
                worker: member.name,
                payer: payer,
                hours: hours,
                options: checkedConfigOptions,
                description: description
            }
            console.log(request);
            const response = await createIntervention(request, member);
            if (response) {
                setHasDeclared(true);
                updateMember({...member, counter: response});
            }
            else {
                setLoadError("une erreur est survenue lors de la déclaration. Veuillez réessayer plus tard.")
            }
        }
    }

  return (<>
    {!hasDeclared && <form id="operationForm" onSubmit={(event) => handleSubmit(event)}>
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
                        <option key={index} value={user.name}>{user.name}</option>
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
                value={hours} 
                onChange={(event) => handlePoints(parseInt(event.target.value, 10) as unknown as InterventionHours) }
                />
            {hoursError && <p>{hoursError}</p>}
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
        <label htmlFor="natureInput">Décrivez ici votre intervention (objectif, lieu...) :</label>
        <textarea 
            name="nature" 
            id="natureInput" 
            cols={30} rows={5} 
            value={description} 
            onChange={(event) => setDescription(event.target.value)}></textarea>
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
        <UIButton type="submit">Déclarer l'intervention</UIButton>
        {loadError && <p>{loadError}</p>}
    </form>}
    {hasDeclared && <>
        <p>Votre déclaration a bien été enregistrée !</p>
        <UIButton onClick={() => setHasDeclared(false)}>Déclarer une nouvelle Intervention</UIButton>
        <UINavLink label={"Consulter votre historique"} href={'/historique'} icon={'/images/stats.svg'} />
    </>}
  </>
  )
}

export default InterventionForm;