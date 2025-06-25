'use client'

import { useState, useEffect } from "react";
import PageForManager from "@/components/manager/PageForManager";
import { ConnectedManager, GuildConfig } from "@/types";
import { useManagerContext } from "@/contexts/managerContext";
import getAllGuildConfigs from "@/tools/front/guildConfig/getAllGuildConfigs";
import ContratCard from "@/components/manager/ContratCard";
import UITextInput from "@/components/UI/UITextInput";
import style from "@/styles/components/manager/listFilters.module.css";

const ManageContrats = (): JSX.Element => {
    const { manager } = useManagerContext();

    const [listOfGuildConfigs, setListOfGuildConfigs] = useState<GuildConfig[]>([]);
    const [filteredGuildConfigs, setFilteredGuildConfigs] = useState<GuildConfig[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortByPackage, setSortByPackage] = useState<boolean>(false);

    // Accent-insensitive normalizer
    const normalize = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const handleSearch = (term: string) => {
        setSearchTerm(term);

        let filtered = listOfGuildConfigs.filter(guildConfig =>
            normalize(guildConfig.name).startsWith(normalize(term))
        );

        filtered = filtered.sort((a, b) => {
            if (sortByPackage && a.currentPackageId !== b.currentPackageId) {
                return a.currentPackageId - b.currentPackageId;
            }
            return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
        });

        setFilteredGuildConfigs(filtered);
    };

    useEffect(() => {
        const fetchGuildConfigs = async () => {
            try {
                const guildConfigs = await getAllGuildConfigs(manager as ConnectedManager);

                const sorted = guildConfigs.sort((a, b) =>
                    a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
                );

                setListOfGuildConfigs(sorted);
                setFilteredGuildConfigs(sorted);
            } catch (error) {
                console.error("Failed to fetch guild configs:", error);
            }
        };

        if (manager) {
            fetchGuildConfigs();
        }
    }, [manager]);

    // Refiltre à chaque fois qu’on coche/décoche
    useEffect(() => {
        handleSearch(searchTerm);
    }, [sortByPackage]);

    return (
        <PageForManager id={""} title={'Résumé des contrats par guilde en cours'}>
            <>
                <div className={style.filters}>
                    <label>
                        {"Recherche par nom de guilde : "}
                        <UITextInput
                            value={searchTerm}
                            onChangeInputValue={handleSearch}
                            placeholder="nom de guilde..."
                            conditions={{
                                regex: /.*/,
                                error: ""
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={sortByPackage}
                            onChange={(e) => setSortByPackage(e.target.checked)}
                        />{" "}
                        Trier aussi par package
                    </label>
                </div>

                {filteredGuildConfigs.length > 0 ? (
                    <ul>
                        {filteredGuildConfigs.map((guildConfig, index) => (
                            <ContratCard key={index} guild={guildConfig} />
                        ))}
                    </ul>
                ) : (
                    <p>
                        {searchTerm.trim() === ""
                            ? "Aucun contrat en cours."
                            : "Aucun contrat ne correspond à votre recherche."}
                    </p>
                )}
            </>
        </PageForManager>
    );
};

export default ManageContrats;
