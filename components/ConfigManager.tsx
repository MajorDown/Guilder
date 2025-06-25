'use client';
import { useState} from 'react';
import UIButton from './UI/UIButton';
import ConfigLister from './ConfigLister';
import ConfigOptionsForm from './ConfigOptionsForm';
import { useguildConfigContext } from '@/contexts/guildConfigContext';
import { useAdminContext } from '@/contexts/adminContext';

/**
 * @module ConfigManager
 * 
 * Permet de gérer la config de la guilde.
 */
const ConfigManager = () => {
    const {admin} = useAdminContext();
    const { guildConfig, updateGuildConfig } = useguildConfigContext();
    // STATES
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    return (
        <div id="configManager">
            <div id="configOptionsList" className="scrollable">
                <h3>Outils pour la guilde {guildConfig?.name} :</h3>
                {admin && guildConfig && <ConfigLister 
                    config={guildConfig} 
                    admin={admin} 
                    onChangeConfig={(newConfig) => updateGuildConfig(newConfig)}
                />}
            </div>
            <div id="configOptionsForm">
                {!showCreateForm && <UIButton className="light" onClick={() => setShowCreateForm(true)}>Ajouter une nouvelle option</UIButton>}
                {admin && guildConfig && showCreateForm && (<ConfigOptionsForm 
                    configFor={admin} 
                    guildConfig={guildConfig} 
                    setGuildConfig={updateGuildConfig} 
                    closeForm={() => setShowCreateForm(false)} 
                />)}
            </div>
        </div>
    );
};

export default ConfigManager;
