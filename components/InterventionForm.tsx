'use client'
import {useState, useEffect, FormEvent} from 'react';
import Image from 'next/image';
import { isFormatted, interventionDateFormat } from '@/tools/isFormatted';
import { GuildConfig, Intervention, InterventionHours, MembersList, UserName } from '@/types'
import createIntervention from '@/tools/front/createIntervention';
import { useMemberContext } from '@/contexts/memberContext';
import { dateGenerator } from '@/tools/dateGenerator';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import getGuildConfig from '@/tools/front/getGuildConfig';
import UIButton from './UI/UIButton';
import UINavLink from './UI/UINavLink';
import UIOptionsSelector from './UI/UIOptionsSelector';

const interventionHoursList: InterventionHours[] = [0.25, 0.50, 0.75, 1, 1.25, 1.50, 1.75, 2,
    2.25, 2.50, 2.75, 3, 3.25, 3.50, 3.75, 4, 4.25, 4.50, 4.75, 5, 5.25, 5.50, 5.75, 6, 6.25, 6.50, 6.75, 7, 7.25, 7.50, 7.75, 8,
    8.25, 8.50, 8.75, 9, 9.25, 9.50, 9.75, 10, 10.25, 10.50, 10.75, 11, 11.25, 11.50, 11.75, 12, 12.25, 12.50, 12.75, 13,
    13.25, 13.50, 13.75, 14, 14.25, 14.50, 14.75, 15, 15.25, 15.50, 15.75, 16, 16.25, 16.50, 16.75, 17, 17.25, 17.50, 17.75, 18,
    18.25, 18.50, 18.75, 19, 19.25, 19.50, 19.75, 20, 20.25, 20.50, 20.75, 21, 21.25, 21.50, 21.75, 22, 22.25, 22.50, 22.75, 23,
    23.25, 23.50, 23.75, 24
];

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
        if (value >= 0.25 && value <= 24) setHours(value);
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
        if (hours < 0.25 && hours >24) setHoursError("Veuillez renseigner un nombre d'heure effectuées correct avant de valider");
        //verification si au moin une option est coché
        if (checkedConfigOptions.length === 0) setLoadError("Vous devez cocher au moins un outil pour valider une déclaration");
        if (member && !payerError && !hoursError && checkedConfigOptions.length >= 1 && date) {
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
    {!hasDeclared && <form id="interventionForm" onSubmit={(event) => handleSubmit(event)}>
        <div className="verticalWrapper" >
            <label htmlFor="payerInput">Pour quel membre de la guilde avez-vous oeuvré ?</label>
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
        <div className="verticalWrapper">
            <label htmlFor="pointsInput">Combien d'heures avez-vous effectué ?</label>
            <select 
                name="points" 
                id="pointsInput"
                value={hours} 
                onChange={(e) => handlePoints(parseFloat(e.target.value) as InterventionHours)}
            >
            {interventionHoursList.map((value) => (
                <option key={value} value={value}>{value} heure(s)</option>
            ))}
        </select>
            {hoursError && <p>{hoursError}</p>}
        </div>
        {configsList && <UIOptionsSelector 
                guildOptions={configsList.config}
                selectedOptions={(list) => setCheckedConfigOptions(list)} 
        />}
        <div className="verticalWrapper">
            <label htmlFor="dateinput">
                <p>A quelle date avez-vous réalisé ses heures ?</p>
                <p>(Vous ne pouvez pas déclarer une opération datant de plus d'une semaine)</p>
            </label>
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
        <div className="verticalWrapper">
            <label htmlFor="natureInput">Décrivez ici votre intervention (objectif, lieu...) :</label>
            <textarea 
                name="nature" 
                id="natureInput" 
                cols={30} rows={5} 
                value={description} 
                onChange={(event) => setDescription(event.target.value)}>
            </textarea>
        </div>
        <div className="verticalWrapper">
            <label id={"infosConfirmation"} htmlFor="">
                <input 
                    type="checkbox" 
                    name="confirm" 
                    id="confirmInput" 
                    checked={confirm} 
                    onChange={() => setConfirm(!confirm)} 
                    required
                />
                en cochant cette case, vous confirmez que l'ensemble des informations
                fournis dans ce formulaire sont correct !
            </label>
        </div>
        <button id={"declareBtn"} type="submit">Déclarer l'intervention</button>
        {loadError && <p className={"formErrorMsg"}>{loadError}</p>}
    </form>}
    {hasDeclared && <>
        <p>Votre déclaration a bien été enregistrée !</p>
        <UIButton onClick={() => setHasDeclared(false)}>Déclarer une nouvelle Intervention</UIButton>
        <UINavLink label={"Consulter votre historique"} href={'/historique'} icon={'/images/icons/historique-white-light.svg'} />
    </>}
  </>
  )
}

export default InterventionForm;