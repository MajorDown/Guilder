'use client'
import {useState, useEffect, useRef} from 'react';
import { ConnectedAdmin, GuildConfig } from '@/types';
import UIButton from './UI/UIButton';
import UIOptionNameInput from './UI/UIOptionNameInput';
import UIOptionCoefInput from './UI/UIOptionCoefInput';
import UIOptionEnableCheckbox from './UI/UIOptionEnableCheckBox';
import getGuildConfig from '@/tools/front/getGuildConfig';

export type ConfigManagerProps = {
    configFor: ConnectedAdmin;
}

/**
 * @module ConfigManager
 * 
 * Permet de gérer la config de la guilde.
 */
const ConfigManager = (props: ConfigManagerProps) => {
    const [guildConfig, setGuildConfig] = useState<GuildConfig | undefined>(undefined);
    const [wantNewOption, setWantNewOption] = useState<boolean>(false);
    const [hasCreateNewOption, setHasCreateNewOption] = useState<boolean>(false);
    const optionNameRef = useRef<HTMLInputElement>(null);
    const optionCoefRef = useRef<HTMLInputElement>(null);
    const optionEnableCheckboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log("useEffect");
        if (hasCreateNewOption) {
            setHasCreateNewOption(false);
        }
        const getConfig = async() => {
            const response = await getGuildConfig(props.configFor) as GuildConfig;
            if (response) setGuildConfig(response);
        }
        getConfig();
    }, [props.configFor, hasCreateNewOption]);

    const handleSubmitNewOption = async() => {
        if (optionNameRef.current && optionCoefRef.current && optionEnableCheckboxRef.current) {
            let request = guildConfig;
            request?.config.push({
                option: optionNameRef.current.value,
                coef: parseInt(optionCoefRef.current.value),
                enabled: optionEnableCheckboxRef.current.checked
            });
            setGuildConfig(request);
            const response = await updateGuildConfig(request);
            const data = await response.json();
            if(data) {
                setWantNewOption(false);
                setHasCreateNewOption(true);
            }
        }
    }
    
    return (
        <div id="configManager">
            <div id="configOptionsList">Tableau de config de {guildConfig?.name}</div>
            <div id="ConfigOptionForm">
                {!wantNewOption && <UIButton onClick={() => setWantNewOption(true)}>Ajouter une nouvelle option</UIButton>}
                {wantNewOption && <form onSubmit={() => handleSubmitNewOption()}>
                    <div className="ConfigInputWrapper">
                        <label htmlFor="optionName">Nom de la nouvelle option :</label>
                        <UIOptionNameInput inputRef={optionNameRef} />                     
                    </div>
                    <div className="ConfigInputWrapper">
                        <label htmlFor="optionCoef">Coef à appliquer :</label>
                        <UIOptionCoefInput inputRef={optionCoefRef} />
                    </div>
                    <div className="ConfigInputWrapper">
                        <label htmlFor="optionIsEnable">Souhaitez-vous rendre cette option utilisable dessuite ?</label>
                        <UIOptionEnableCheckbox inputRef={optionEnableCheckboxRef}/>
                    </div>
                    <UIButton type="submit">Valider la nouvelle option</UIButton>
                    <UIButton onClick={() => setWantNewOption(false)}>Annuler la création d'une nouvelle option</UIButton>
                </form>}
            </div>
        </div>
  )
}

export default ConfigManager;