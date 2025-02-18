'use client';
import { useState, useEffect } from 'react';
import { ConnectedAdmin, GuildConfig } from '@/types';
import UIButton from './UI/UIButton';
import getGuildConfig from '@/tools/front/getGuildConfig';
import ConfigLister from './ConfigLister';
import ConfigOptionsForm from './ConfigOptionsForm';

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

    useEffect(() => {
        const fetchConfig = async () => {
            const response = await getGuildConfig(configFor) as GuildConfig;
            setGuildConfig(response || undefined);
        };
        fetchConfig();
    }, [configFor]);

    return (
        <div id="configManager">
            <div id="configOptionsList" className="scrollable">
                <h3>Outils pour la guilde {guildConfig?.name} :</h3>
                <ConfigLister config={guildConfig} admin={configFor} />
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
            </div>
        </div>
    );
};

export default ConfigManager;
