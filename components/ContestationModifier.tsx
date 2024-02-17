import getGuildConfig from '@/tools/front/getGuildConfig';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import { ConnectedAdmin, Contestation, GuildConfig, InterventionHours, MembersList, UserName } from '@/types';
import { useEffect, useState, useRef } from 'react';
import UIButton from './UI/UIButton';

export type interventionModifierProps = {
    admin: ConnectedAdmin;
    contestation: Contestation;
}

const InterventionModifier = (props: interventionModifierProps) => {
    const [guildMembers, setGuildMembers] = useState<MembersList | null>();
    const [configsList, setConfigsList] = useState<GuildConfig | null>();
    const [interventionDate, setInterventionDate] = useState<string>();
    const [worker, setWorker] = useState<UserName>();
    const [payer, setPayer] = useState<UserName>();
    const [hours, setHours] = useState<InterventionHours>(props.contestation.contestedIntervention.hours);
    const [checkedConfigOptions, setCheckedConfigOptions] = useState<string[]>([]);
    const [description, setDescription] = useState<string>();

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
    
    return (
        <div id={"contestationmodifier"}>
            <div className={"dataModifier workerModifier"}>
                <label htmlFor="workerInput">Membre Déclarant :</label>
                <select 
                    id="workerInput"
                    value={props.contestation.contestedIntervention.worker}
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
                    value={props.contestation.contestedIntervention.payer}
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
        </div>
  )
}

export default InterventionModifier;