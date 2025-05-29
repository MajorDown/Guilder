'use client'
import { useState, useEffect } from "react";
import getGuildData, {GuildDataOutput} from "@/tools/front/guildConfig/getGuildData";
import Style from "@/styles/components/manager/guildDataViewer.module.css";
import {useManagerContext } from "@/contexts/managerContext";
import { ConnectedManager } from "@/types";

type GuildDataViewerProps = {
    guildName: string
}

type Model = 'member' | 'admin' | 'intervention' | 'contestation' | 'tool' | 'rule' ;

const GuildDataViewer = (props: GuildDataViewerProps): JSX.Element => {
    const { manager } = useManagerContext();
    const [selectedModel, setSelectedModel] = useState<Model>('admin');
    const [guildData, setGuildData] = useState<GuildDataOutput>();

    const fetchGuildData = async () => {
        try {
            const data = await getGuildData({ manager: manager as ConnectedManager, guildName: props.guildName });
            console.log("Guild Data:", data);
            setGuildData(data);
        } catch (error) {
            console.error("Failed to fetch guild data:", error);
        }
    };

    useEffect(() => {
        fetchGuildData();
    }, [props.guildName])

    return (
        <div className={Style.guildDataViewer}>
            <h3>Données de la guilde {props.guildName}</h3>
            <div className={Style.selector}>
                <button className={selectedModel === 'admin' ? 'light' : 'dark'} onClick={() => setSelectedModel('admin')}>Admins</button>
                <button className={selectedModel === 'member' ? 'light' : 'dark'} onClick={() => setSelectedModel('member')}>Membres</button>
                <button className={selectedModel === 'intervention' ? 'light' : 'dark'} onClick={() => setSelectedModel('intervention')}>Interventions</button>
                <button className={selectedModel === 'contestation' ? 'light' : 'dark'} onClick={() => setSelectedModel('contestation')}>Contestations</button>
                <button className={selectedModel === 'tool' ? 'light' : 'dark'} onClick={() => setSelectedModel('tool')}>Outils</button>
                <button className={selectedModel === 'rule' ? 'light' : 'dark'} onClick={() => setSelectedModel('rule')}>Règles</button>
            </div>
            <ul>
                {guildData && selectedModel === 'admin' && guildData?.admins.map((admin, index) => (
                    <p key={index}>{admin.name} : {admin.mail} - {admin.phone}</p>
                ))}
                {guildData && selectedModel === 'member' && guildData?.members.map((member, index) => (
                    <p key={index}>{member.name} : {member.mail} - {member.phone}</p>
                ))}
                {guildData && selectedModel === 'intervention' && guildData?.interventions.map((intervention, index) => (
                    <p key={index}>{intervention.interventionDate} : {intervention.worker} pour {intervention.payer} ~ {intervention.description}</p>
                ))}
                {guildData && selectedModel === 'contestation' && guildData?.contestations.map((contestation, index) => (
                    <p key={index}>{contestation.contestationDate} : {contestation.contester} dit : {contestation.contesterMessage}</p>
                ))}
                {guildData && selectedModel === 'tool' && guildData?.guildConfig.config.map((tool, index) => (
                    <p key={index}>{tool.option} : {tool.coef}({tool.enabled? '(actif)' : ''})</p>
                ))}
                {guildData && selectedModel === 'rule' && guildData?.guildConfig.rules?.map((rule, index) => (
                    <p key={index}>{rule}</p>
                ))}
            </ul>
        </div>
    );
}

export default GuildDataViewer;