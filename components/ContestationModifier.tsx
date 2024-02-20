import getGuildConfig from '@/tools/front/getGuildConfig';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import { ConnectedAdmin, Contestation, GuildConfig, Intervention, InterventionHours, MembersList, UserName } from '@/types';
import { FormEvent, useEffect, useState } from 'react';
import UIButton from './UI/UIButton';
import { interventionDateFormat, isFormatted } from '@/tools/isFormatted';
import updateIntervention from '@/tools/front/updateIntervention';
import UINavLink from './UI/UINavLink';

export type interventionModifierProps = {
    admin: ConnectedAdmin;
    contestation: Contestation;
}

const InterventionModifier = (props: interventionModifierProps) => {
    const [guildMembers, setGuildMembers] = useState<MembersList | null>();
    const [configsList, setConfigsList] = useState<GuildConfig | null>();
    const [hasUpdate, setHasUpdate] = useState<boolean>(false);
    const [interventionDate, setInterventionDate] = useState<string>(props.contestation.contestedIntervention.interventionDate);
    const [worker, setWorker] = useState<UserName>(props.contestation.contestedIntervention.worker);
    const [payer, setPayer] = useState<UserName>(props.contestation.contestedIntervention.payer);
    const [hours, setHours] = useState<InterventionHours>(props.contestation.contestedIntervention.hours);
    const [checkedConfigOptions, setCheckedConfigOptions] = useState<string[]>([]);
    const [description, setDescription] = useState<string>(props.contestation.contestedIntervention.description);
    const [adminConclusion, setAdminConclusion] = useState<"accordé" | "refusé" | "">("");
    const [adminMessage, setAdminMessage] = useState<string>("");

    useEffect(() => {
        //RECUPERATION DE LA LISTE DES MEMBRES DE LA GUILDE
        const getMembers = async () => {
            const response = await getGuildMembers(props.admin);
            if (response) {
                response.sort((a, b) => a.name.localeCompare(b.name));
                setGuildMembers(response);
            }
            else setGuildMembers(null);
        }
        getMembers();
        // RECUPERATION DE LA CONFIGURATION DE LA GUILDE
        const getConfig = async () => {
            if (!props.admin) return;
            const response = await getGuildConfig(props.admin) as GuildConfig;
            if (response) {
                const filteredConfig = response.config.filter(option => option.enabled);
                let sortedList = filteredConfig.sort((a, b) => a.option.localeCompare(b.option));
                setConfigsList({...response, config: sortedList});
            }
        };
        getConfig();
        // RECUPERATION DU TABLEAU D'OPTIONS DE L'INTERVENTION AU FORMAT STRING[]
        let optionsArray: string[] = [];
        props.contestation.contestedIntervention.options.forEach((option) => {
            if (typeof option === 'object') optionsArray.push(option.option);
            else optionsArray.push(option);
        });
        setCheckedConfigOptions(optionsArray);
    }, [])

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

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (adminConclusion === "") return;
        let updatedContestation : Contestation = {
            contestationDate: props.contestation.contestationDate,
            contester: props.contestation.contester,
            contesterMessage: props.contestation.contesterMessage,
            contestedIntervention: {
                declarationDate: props.contestation.contestedIntervention.declarationDate,
                interventionDate: interventionDate,
                worker: worker,
                payer: payer,
                hours: hours,
                options: checkedConfigOptions,
                description: description,
                imagesUrls: props.contestation.contestedIntervention.imagesUrls        
            },
            adminConclusion: adminConclusion,
            adminMessage: adminMessage,
            guild: props.contestation.guild
        };
        if (adminConclusion === "refusé") updatedContestation = {
            contestationDate: props.contestation.contestationDate,
            contester: props.contestation.contester,
            contesterMessage: props.contestation.contesterMessage,
            contestedIntervention: props.contestation.contestedIntervention,
            adminConclusion: adminConclusion,
            adminMessage: adminMessage,
            guild: props.contestation.guild            
        }
        const response = await updateIntervention(props.admin, updatedContestation);
        if (response) {
            console.log("Intervention statuée avec succès !");
            setHasUpdate(true);
        }
    }
    
    return (<>
        {(hasUpdate === true) ? <>
            <p>La contestation a bien été statuée !</p>
            <UINavLink label={"Retour à la liste des contestations"} href={"/arbitrage"} icon={"/images/justice.svg"} />
            </> : 
            <form id={"interventionModifier"} onSubmit={(event) => handleSubmit(event)}>
            <p>{props.contestation.contester} : "{props.contestation.contesterMessage}"</p>
            <div className={"dataModifier workerModifier"}>
                <label htmlFor="workerInput">Membre Déclarant :</label>
                <select 
                    id="workerInput"
                    value={worker}
                    onChange={(event) => setWorker(event.target.value as UserName)}
                >
                    {guildMembers && guildMembers.map((member) => (
                        <option value={member.name}>{member.name}</option>
                    ))}
                </select>
            </div>
            <div className={"dataModifier payerModifier"}>
                <label htmlFor="payerInput">Membre Payeur :</label>
                <select 
                    id="payerInput"
                    value={payer}
                    onChange={(event) => setPayer(event.target.value as UserName)}
                >
                    {guildMembers && guildMembers.map((member) => (
                        <option value={member.name}>{member.name}</option>
                    ))}
                </select>
            </div>
            <div className={"dataModifier hoursModifier"}>
                <label htmlFor="hoursInput">Nombre d'heures déclarées :</label>
                <input 
                    type="number" 
                    id="hoursInput"
                    min={1}
                    max={24}
                    value={hours}
                    onChange={(event) => {
                        const newHoursValue = parseInt(event.target.value, 10);
                        if (newHoursValue >= 1 && newHoursValue <= 24) {
                            const newHours: InterventionHours = newHoursValue as InterventionHours;
                            setHours(newHours);
                        }
                    }}
                />
            </div>
            <div className={"dataModifier optionsModifier"}>
                <label htmlFor="optionsInput">Options déclarées :</label>
                <div>
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
            </div>
            <div className={"dataModifier dateModifier"}>
                <label htmlFor="dateinput">A quelle date a été réalisé l'intervention ?</label>
                <input 
                    type="date" 
                    id="dateInput" 
                    value={interventionDate}
                    onChange={(event) => {
                        if (isFormatted(event.target.value, interventionDateFormat)) setInterventionDate(event.target.value)
                    } }
                    required
                />
            </div>
            <div className={"dataModifier descriptionModifier"}>
                <label htmlFor="descriptionInput">Description de l'intervention :</label>
                <textarea 
                    id="descriptionInput"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div className={"dataModifier adminConclusion"}>
                <label htmlFor="adminConclusionInput">Conclusion de l'admin :</label>
                <select id="adminConclusionInput"
                    required
                    value={adminConclusion}
                    onChange={(event) => setAdminConclusion(event.target.value as "accordé" | "refusé" | "")}
                >
                    <option value={""}>En attente</option>
                    <option value={"accordé"}>Accordé</option>
                    <option value={"refusé"}>Refusé</option>
                </select>
            </div>
            <label htmlFor="adminMessageInput">Message de l'admin :</label>
            <textarea 
                rows={5}
                cols={30}
                maxLength={500}
                id="adminMessageInput" 
                value={adminMessage}
                onChange={(event) => setAdminMessage(event.target.value)} 
            />
            <UIButton type={"submit"}>Enregistrer les modifications</UIButton>
        </form>}
    </>)
}

export default InterventionModifier;