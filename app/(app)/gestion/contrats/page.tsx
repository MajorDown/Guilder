'use client'
import { useState, useEffect } from "react";
import PageForManager from "@/components/manager/PageForManager"
import { ConnectedManager, GuildConfig } from "@/types";
import { useManagerContext } from "@/contexts/managerContext";
import getAllGuildConfigs from "@/tools/front/guildConfig/getAllGuildConfigs";
import ContratCard from "@/components/manager/ContratCard";
import UIGuildNameInput from "@/components/UI/UIGuildNameInput";
import UITextInput from "@/components/UI/UITextInput";

const ManageContrats = (): JSX.Element => {
    const { manager } = useManagerContext();
    const [listOfGuildConfigs, setListOfGuildConfigs] = useState<GuildConfig[]>([]);
    const [filteredGuildConfigs, setFilteredGuildConfigs] = useState<GuildConfig[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term.trim() === "") {
            setFilteredGuildConfigs(listOfGuildConfigs);
        } else {
            const filtered = listOfGuildConfigs.filter(guildConfig =>
                guildConfig.name.toLowerCase().startsWith(term.toLowerCase())
            );
            setFilteredGuildConfigs(filtered);
        }
    };

    useEffect(() => {
        const fetchGuildConfigs = async () => {
            try {
                const guildConfigs = await getAllGuildConfigs(manager as ConnectedManager);
                setListOfGuildConfigs(guildConfigs);
                setFilteredGuildConfigs(guildConfigs); // Initialiser avec tous les guildes
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
                <label htmlFor="">
                    {"Recherche par nom de guilde : "}
                    <UITextInput
                        value={searchTerm}
                        onChangeInputValue={handleSearch}
                        placeholder="nom de guilde..." 
                        conditions={{
                            regex: /.*/,
                            error: ""
                        }}                    />
                </label>
                {filteredGuildConfigs.length > 0 ? (<ul>
                    {filteredGuildConfigs.map((guildConfig, index) => (
                        <ContratCard key={index} guild={guildConfig} />
                    ))}
                </ul>) : (
                <p>
                    {searchTerm.trim() === ""
                    ? "Aucun contrat en cours."
                    : "Aucune guilde ne correspond à votre recherche."
                    }
                </p>
)}

            </>}
        </PageForManager>
    )
}

export default ManageContrats