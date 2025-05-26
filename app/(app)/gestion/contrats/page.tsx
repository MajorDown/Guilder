'use client'
import { useState, useEffect } from "react";
import PageForManager from "@/components/manager/PageForManager"
import { ConnectedManager, GuildConfig } from "@/types";
import { useManagerContext } from "@/contexts/managerContext";
import getAllGuildConfigs from "@/tools/front/guildConfig/getAllGuildConfigs";
import ContratCard from "@/components/manager/ContratCard";

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
                            <ContratCard key={index} guild={guildConfig} />
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