'use client';
import { useState, useEffect } from 'react';
import { ConnectedAdmin, GuildConfig } from '@/types';
import UIButton from './UI/UIButton';
import getGuildConfig from '@/tools/front/getGuildConfig';
import ConfigLister from './ConfigLister';
import ConfigOptionsForm from './ConfigOptionsForm';
import ConfigUpdateForm from './ConfigUpdateForm';

export type ConfigManagerProps = {
    configFor: ConnectedAdmin;
};

/**
 * @module ConfigManager
 * 
 * Permet de gérer la config de la guilde.
 */
const ConfigManager = ({ configFor }: ConfigManagerProps) => {
    // STATES
    const [guildConfig, setGuildConfig] = useState<GuildConfig | undefined>(undefined);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [optionToUpdate, setOptionToUpdate] = useState<string>("");

    useEffect(() => {
        const fetchConfig = async () => {
            const response = await getGuildConfig(configFor) as GuildConfig;
            setGuildConfig(response || undefined);
        };
        fetchConfig();
    }, [configFor]);

    useEffect(() => {
        if (optionToUpdate) setShowUpdateForm(true);
        console.log( "optionTo Update", optionToUpdate);
    }, [optionToUpdate]);

    return (
        <div id="configManager">
            <div id="configOptionsList" className="scrollable">
                <h3>Outils pour la guilde {guildConfig?.name} :</h3>
                <ConfigLister config={guildConfig} admin={configFor} wantEdit={(optionName) => setOptionToUpdate(optionName)}/>
            </div>
            <div id="configOptionsForm">
                {!showCreateForm && <UIButton className="light" onClick={() => setShowCreateForm(true)}>Ajouter une nouvelle option</UIButton>}
                {showCreateForm && guildConfig && (
                    <ConfigOptionsForm 
                        configFor={configFor} 
                        guildConfig={guildConfig} 
                        setGuildConfig={setGuildConfig} 
                        closeForm={() => setShowCreateForm(false)} 
                    />
                )}
                {showUpdateForm && guildConfig && (
                    <ConfigUpdateForm 
                        configFor={configFor} 
                        guildConfig={guildConfig} 
                        setGuildConfig={setGuildConfig} 
                        optionToUpdate={guildConfig.config.find((option) => option.option === optionToUpdate) as any} 
                        closeForm={() => setShowUpdateForm(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default ConfigManager;
