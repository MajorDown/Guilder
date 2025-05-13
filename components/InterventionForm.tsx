'use client'
import {useState, useEffect, FormEvent} from 'react';
import { isFormatted, interventionDateFormat } from '@/tools/isFormatted';
import { GuildConfig, Intervention, MembersList, UserName } from '@/types'
import createIntervention from '@/tools/front/createIntervention';
import { useMemberContext } from '@/contexts/memberContext';
import { useguildConfigContext } from '@/contexts/guildConfigContext';
import { dateGenerator } from '@/tools/dateGenerator';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import UIButton from './UI/UIButton';
import UINavLink from './UI/UINavLink';
import UIOptionsSelector from './UI/UIOptionsSelector';
import UIHoursInput from './UI/UIHoursInput';

/**
 * @function InterventionForm
 * @description Composant pour un formulaire de déclaration d'intervention.
 * @returns {JSX.Element} Un formulaire de déclaration d'intervention.
 */
const InterventionForm = () => {
    const {guildConfig} = useguildConfigContext();
    const {member, updateMember} = useMemberContext();
    const [payer, setPayer] = useState<UserName | "">("");
    const [payerError, setPayerError] = useState<string>("");
    const [hours, setHours] = useState<number>(1);
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
        if (guildConfig) {
            const filteredConfig = guildConfig.config.filter(option => option.enabled);
            let sortedList = filteredConfig.sort((a, b) => a.option.localeCompare(b.option));
            setConfigsList({...guildConfig, config: sortedList});
        }
    }, [member, guildConfig]);

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

    const handleDate = (value: string) => {
        if (isFormatted(value, interventionDateFormat)) setDate(value);
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (payer === "") setPayerError("Veuillez choisir un bénéficiaire avant de valider");
        if (hours <= 0) setHoursError("Veuillez renseigner un nombre d'heure supérieur à 0");
        if (hours >24) setHoursError("Veuillez renseigner un nombre d'heure inférieur ou égal à 24");
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
                localStorage.setItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_MEMBERCONTEXT_KEY as string, JSON.stringify({...member, counter: response}));
                setPayer("");
                setHours(1);
                setCheckedConfigOptions([]);
                setDate("");
                setDescription("");
                setConfirm(false);
            }
            else {
                setLoadError("une erreur est survenue lors de la déclaration.")
            }
        }
    }

  return (<>
    {!hasDeclared && <form id="interventionForm" onSubmit={(event) => handleSubmit(event)}>
        <div className="verticalWrapper" >
            <label htmlFor="payerInput">Pour quel membre de la guilde êtes-vous intervenu ?</label>
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
            {payerError && <p className={"formErrorMsg"}>{payerError}</p>}
        </div>
        <div className="verticalWrapper">
            <label htmlFor="pointsInput">Combien d'heures ont été effectuées ?</label>
            <UIHoursInput onChangeValue={(value) => setHours(value)}/>
            {hoursError && <p className={"formErrorMsg"}>{hoursError}</p>}
        </div>
        {configsList && <UIOptionsSelector 
                guildOptions={configsList.config}
                selectedOptions={(list) => setCheckedConfigOptions(list)} 
        />}
        <div className="verticalWrapper">
            <label htmlFor="dateinput">
                <p>A quelle date avez-vous réalisé cette intervention ?</p>
                <p>(Vous ne pouvez pas déclarer une intervention datant de plus d'une semaine)</p>
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