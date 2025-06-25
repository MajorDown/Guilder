import { useguildConfigContext } from '@/contexts/guildConfigContext';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import { ConnectedAdmin, Contestation, GuildConfig, MembersList, UserName } from '@/types';
import { FormEvent, useEffect, useState } from 'react';
import { interventionDateFormat, isFormatted } from '@/tools/isFormatted';
import updateIntervention from '@/tools/front/updateIntervention';
import UINavLink from './UI/UINavLink';
import UIOptionsSelector from './UI/UIOptionsSelector';
import deleteIntervention from '@/tools/front/deleteIntervention';

export type interventionModifierProps = {
    admin: ConnectedAdmin;
    contestation: Contestation;
}

/**
 * @function InterventionModifier
 * @description Composant pour modifier une intervention contestée.
 * @param {interventionModifierProps} props - Les props du composant.
 * @param {ConnectedAdmin} props.admin - L'admin connecté.
 * @param {Contestation} props.contestation - La contestation à modifier.
 * @returns {JSX.Element} Un formulaire pour modifier une intervention contestée.
 */
const InterventionModifier = (props: interventionModifierProps) => {
    const {guildConfig} = useguildConfigContext();
    const [guildMembers, setGuildMembers] = useState<MembersList | null>();
    const [configsList, setConfigsList] = useState<GuildConfig | null>();
    const [hasUpdate, setHasUpdate] = useState<boolean>(false);
    const [interventionDate, setInterventionDate] = useState<string>(props.contestation.contestedIntervention.interventionDate);
    const [worker, setWorker] = useState<UserName>(props.contestation.contestedIntervention.worker);
    const [payer, setPayer] = useState<UserName>(props.contestation.contestedIntervention.payer);
    const [hours, setHours] = useState<number>(props.contestation.contestedIntervention.hours);
    const [checkedConfigOptions, setCheckedConfigOptions] = useState<string[]>([]);
    const [description, setDescription] = useState<string>(props.contestation.contestedIntervention.description);
    const [adminConclusion, setAdminConclusion] = useState<"accordé" | "refusé" | "">("");
    const [adminMessage, setAdminMessage] = useState<string>("");
    const [formErrorMsg, setFormErrorMsg] = useState<string>("");

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
        if (guildConfig) {

            const filteredConfig = guildConfig.config.filter(option => option.enabled);
            let sortedList = filteredConfig.sort((a, b) => a.option.localeCompare(b.option));
            setConfigsList({...guildConfig, config: sortedList});
        }
        // RECUPERATION DU TABLEAU D'OPTIONS DE L'INTERVENTION AU FORMAT STRING[]
        let optionsArray: string[] = [];
        props.contestation.contestedIntervention.options.forEach((option) => {
            if (typeof option === 'object') optionsArray.push(option.option);
            else optionsArray.push(option);
        });
        setCheckedConfigOptions(optionsArray);
    }, [guildConfig])

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
        if (hours < 0.1 || hours > 24) setFormErrorMsg("Le nombre d'heures doit être compris entre 0.1 et 24.");
        if (adminConclusion === "") {
            setFormErrorMsg("Veuillez statuer sur la contestation ('accordé' ou 'refusé')");
            return;
        }
        const confirmUpdate = window.confirm("Vous êtes sur le point de statuer sur une contestation. Cette action sera irrévocable. Confirmez-vous ?");
        if (!confirmUpdate) return;
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
        if (response === null) setFormErrorMsg("Erreur lors de la modification de l'intervention.");
        else setHasUpdate(true);
    }

    const handleDelete = async () => {
        // REQUËTE DE SUPPRESSION DE L'INTERVENTION
        const confirmUpdate = window.confirm("Vous êtes sur le point de supprimer une intervention. La contestation sera alors statué comme étant 'accordé'. Cette action sera irrévocable. Confirmez-vous ?");
        if (!confirmUpdate) return;
        const response = await deleteIntervention(props.admin, props.contestation);
        if (response) {
            console.log("Intervention supprimée avec succès !");
            setHasUpdate(true);
        }
    }
    
    return (<>
        {(hasUpdate === true) ? <>
            <p id={"validationMsg"}>La contestation a bien été statuée !</p>
            <UINavLink label={"Retour à la liste des contestations"} href={"/arbitrage"} icon={"/images/icons/jugement-green.svg"} />
            </> : 
            <form id={"interventionModifier"} className={"scrollable"} onSubmit={(event) => handleSubmit(event)}>
            <p>{props.contestation.contester} : "{props.contestation.contesterMessage}"</p>
            <div className={"wrapper-horizontal"}>
                <div className={"wrapper-vertical workerModifier"}>
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
                <div className={"wrapper-vertical payerModifier"}>
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
            </div>
            <div className={"wrapper-vertical hoursModifier"}>
                <label htmlFor="hoursInput">Nombre d'heures déclarées :</label>
                <input 
                    type="number" 
                    id="hoursInput"
                    step={0.1}
                    min={0.1}
                    max={24}
                    value={hours}
                    onChange={(event) => {
                        const newHoursValue = parseInt(event.target.value, 10);
                        if (newHoursValue >= 0.1 && newHoursValue <= 24) {
                            const newHours = newHoursValue as number;
                            setHours(newHours);
                        }
                    }}
                />
            </div>
            {configsList != undefined && <UIOptionsSelector 
                guildOptions={configsList.config} 
                initialSelectedOptions={checkedConfigOptions}
                selectedOptions={(list) => setCheckedConfigOptions(list)} 
            />}
            <div className={"wrapper-vertical dateModifier"}>
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
            <div className={"descriptionModifier"}>
                <label htmlFor="descriptionInput">Description de l'intervention :</label>
                <textarea
                    rows={3}
                    cols={50}
                    maxLength={200}
                    id="descriptionInput"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div className={"wrapper-vertical adminConclusion"}>
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
            <div className={"adminMessage"}>
                <label htmlFor="adminMessageInput">Message de l'admin :</label>
                <textarea 
                    rows={5}
                    cols={50}
                    maxLength={500}
                    id="adminMessageInput" 
                    value={adminMessage}
                    onChange={(event) => setAdminMessage(event.target.value)} 
                />
            </div>
            <div id={"contestationBtns"}>
                <button className={"light"} id={"modifyIntervention"} type={"submit"}>Enregistrer les modifications</button>
                <button 
                    className={"light"} 
                    id={"deleteIntervention"} 
                    type={"button"}
                    onClick={() => handleDelete()}
                >
                    Supprimer l'intervention
                </button>
            </div>
            {formErrorMsg && <p className={"formErrorMsg"}>{formErrorMsg}</p>}
        </form>}
    </>)
}

export default InterventionModifier;

function useGuildConfigContext() {
    throw new Error('Function not implemented.');
}
