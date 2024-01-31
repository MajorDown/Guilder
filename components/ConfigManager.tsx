'use client'
import {useState, useEffect} from 'react';
import { ConnectedAdmin, GuildConfig } from '@/types';
import UIButton from './UI/UIButton';

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

    useEffect(() => {}, [props.configFor]);
    
    return (
        <div id="configManager">
            <div id="configOptionsList">Tableau de config</div>
            <div id="ConfigOptionForm">
                {!wantNewOption && <UIButton onClick={() => setWantNewOption(true)}>Ajouter une nouvelle option</UIButton>}
                {wantNewOption && <form>
                    <div className="ConfigInputWrapper">
                        <label htmlFor="optionName">Nom de l'option :</label>
                    </div>
                    <div className="ConfigInputWrapper">
                        <label htmlFor="optionCoef">Coef de l'option :</label>
                    </div>
                    <div className="ConfigInputWrapper">
                        <label htmlFor="optionIsEnable">Souhaitez-vous rendre cette option utilisable dessuite ?</label>
                    </div>
                    <UIButton onClick={() => setWantNewOption(false)}>Annuler</UIButton>
                    <UIButton type="submit">Ajouter</UIButton>
                </form>}
            </div>
        </div>
  )
}

export default ConfigManager;