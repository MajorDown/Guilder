'use client'
import { useState, useEffect } from "react";
import PageForManager from "@/components/manager/PageForManager"
import { ConnectedManager, GuildConfig } from "@/types";
import { useManagerContext } from "@/contexts/managerContext";
import getAllGuildConfigs from "@/tools/front/guildConfig/getAllGuildConfigs";

const ManageContrats = (): JSX.Element => {
    const { manager } = useManagerContext();
    const [listOfGuildConfigs, setListOfGuildConfigs] = useState<GuildConfig[]>([]);

    useEffect(() => {
        const fetchGuildConfigs = async () => {
            try {
                const guildConfigs = await getAllGuildConfigs(manager as ConnectedManager);
                setListOfGuildConfigs(guildConfigs);
            } catch (error) {
                console.error("Failed to fetch guild configs:", error);
            }
        };
        if (manager) {
            fetchGuildConfigs();
        }
    }, [manager])
    return (
        <PageForManager id={""} title={'Résumé des contrats par guilde en cours'}>
            {<>
                {listOfGuildConfigs.length > 0 ? (
                    <ul>
                        {listOfGuildConfigs.map((guildConfig, index) => (
                            <li key={index}>
                                <h3>{guildConfig.name}</h3>
                                <p>Mail: {guildConfig.mail}</p>
                                <p>Phone: {guildConfig.phone}</p>
                                <p>Current Package ID: {guildConfig.currentPackageId}</p>
                                <p>Current Period: {guildConfig.currentPeriod}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun contrat en cours.</p>
                )}
            </>}
        </PageForManager>
    )
}

export default ManageContrats