'use client'
import {useState, useEffect, useRef, FormEvent} from 'react';
import { ConnectedAdmin, GuildConfig } from '@/types';
import UIButton from './UI/UIButton';
import UIOptionNameInput from './UI/UIOptionNameInput';
import UIOptionCoefInput from './UI/UIOptionCoefInput';
import UIOptionEnableCheckbox from './UI/UIOptionEnableCheckBox';
import getGuildConfig from '@/tools/front/getGuildConfig';
import updateGuildConfig from '@/tools/front/updateGuildConfig';

export type ConfigManagerProps = {
    configFor: ConnectedAdmin;
}

/**
 * @module ConfigManager
 * 
 * Permet de gérer la config de la guilde.
 */
const ConfigManager = (props: ConfigManagerProps) => {
    //STATES
    const [guildConfig, setGuildConfig] = useState<GuildConfig | undefined>(undefined);
    const [wantNewOption, setWantNewOption] = useState<boolean>(false);
    const [newOptionError, setNewOptionError] = useState<string>("");
    // REFS
    const optionNameRef = useRef<HTMLInputElement>(null);
    const optionCoefRef = useRef<HTMLInputElement>(null);
    const optionEnableCheckboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log(guildConfig);
    }, [guildConfig])

    useEffect(() => {
        const getConfig = async() => {
            const response = await getGuildConfig(props.configFor) as GuildConfig;
            if (response) setGuildConfig(response);
        }
        getConfig();
    }, []);

    const handleSubmitNewOption = async(event: FormEvent) => {
        event.preventDefault();        
        if (optionNameRef.current && optionCoefRef.current && optionEnableCheckboxRef.current) {
            let newGuildConfig = guildConfig;
            //vérifier que la valeur de optionNameRef.current.value n'a pas la meme valeur qu'une option déjà existante
            const alreadyExist = newGuildConfig?.config.find((option) => option.option === optionNameRef.current?.value);
            if (alreadyExist) {
                setNewOptionError("Cette option existe déjà. Veuillez renommer votre nouvelle option.");
                setTimeout(() => setNewOptionError(""), 5000);
                return;
            }
            newGuildConfig?.config.push({
                option: optionNameRef.current.value,
                coef: parseFloat(optionCoefRef.current.value),
                enabled: optionEnableCheckboxRef.current.checked
            });
            const response = await updateGuildConfig(props.configFor, newGuildConfig as GuildConfig);
            if (response instanceof Response) {
                const newData = await response.json();
                if(newData) {
                    setGuildConfig(newData);
                    setWantNewOption(false);
                }
            }
            else {
                setNewOptionError("un problême est survenu lors de la création de la nouvelle option. Veuillez réessayer plus tard.");
                setTimeout(() => setNewOptionError(""), 5000);
            }
        }
    }
    
    return (
        <div id="configManager">
            <div id="configOptionsList">Tableau de config de {guildConfig?.name}</div>
            <div id="ConfigOptionForm">
                {!wantNewOption && <UIButton onClick={() => setWantNewOption(true)}>Ajouter une nouvelle option</UIButton>}
                {wantNewOption && <form onSubmit={(event) => handleSubmitNewOption(event)}>
                    <div className="ConfigInputWrapper">
                        <label htmlFor="optionName">Nom de la nouvelle option :</label>
                        <UIOptionNameInput inputRef={optionNameRef} required/>                     
                    </div>
                    <div className="ConfigInputWrapper">
                        <label htmlFor="optionCoef">Coef à appliquer :</label>
                        <UIOptionCoefInput inputRef={optionCoefRef} required/>
                    </div>
                    <div className="ConfigInputWrapper">
                        <label htmlFor="optionIsEnable">Souhaitez-vous rendre cette option utilisable dessuite ?</label>
                        <UIOptionEnableCheckbox inputRef={optionEnableCheckboxRef}/>
                    </div>
                    <UIButton type="submit">Valider la nouvelle option</UIButton>
                    <UIButton onClick={() => setWantNewOption(false)}>Annuler la création d'une nouvelle option</UIButton>
                    {newOptionError && <p style={{color: "red"}}>{newOptionError}</p>}
                </form>}
            </div>
        </div>
  )
}

export default ConfigManager;