import { Facture } from "@/types";
import { useState, useMemo } from "react";
import style from '@/styles/components/FactureManager.module.css';
import FactureFilterBtn from "@/components/god/FactureFilterBtn";
import FactureLister from "./FactureLister";
import Image from "next/image";

type FilterType = "byGuild" | "byMonth";

type FactureManagerProps = {
    Factures: Facture[];
};

const FactureManager = ({ Factures }: FactureManagerProps): JSX.Element => {
    const [filterType, setFilterType] = useState<FilterType>("byGuild");
    const [filteredFactures, setFilteredFactures] = useState<Facture[]>([]);
    const [displayFilteredFactures, setDisplayFilteredFactures] = useState<boolean>(false);

    // Extraction et tri des guildes uniques avec leur statut
    const uniqueGuilds = useMemo(() => {
        return Array.from(new Set(Factures.map(facture => facture.client.name)))
            .sort((a, b) => a.localeCompare(b))
            .map((guild): { name: string; status: "en attente" | "à jour" } => {
                const hasPending = Factures.some(facture => facture.client.name === guild && facture.status !== "paid");
                return { name: guild, status: hasPending ? "en attente" : "à jour" };
            });
    }, [Factures]);

    // Extraction et tri des mois uniques avec leur statut
    const uniqueMonths = useMemo(() => {
        return Array.from(new Set(Factures.map(facture => {
            const year = facture.id.substring(0, 4);
            const month = facture.id.substring(4, 6);
            return `${month}/${year}`;
        })))
            .sort((a, b) => {
                const [monthA, yearA] = a.split("/").map(Number);
                const [monthB, yearB] = b.split("/").map(Number);
                return yearB - yearA || monthB - monthA; // Tri décroissant (plus récent → plus ancien)
            })
            .map((monthYear): { monthYear: string; status: "en attente" | "à jour" } => {
                const hasPending = Factures.some(facture => {
                    const year = facture.id.substring(0, 4);
                    const month = facture.id.substring(4, 6);
                    return `${month}/${year}` === monthYear && facture.status !== "paid";
                });
                return { monthYear, status: hasPending ? "en attente" : "à jour" };
            });
    }, [Factures]);

    // Fonction pour filtrer les factures en fonction du filtre sélectionné
    const handleFilterSelection = (filterValue: string) => {
        const filtered = filterType === "byGuild"
            ? Factures.filter(facture => facture.client.name === filterValue)
            : Factures.filter(facture => {
                const year = facture.id.substring(0, 4);
                const month = facture.id.substring(4, 6);
                return `${month}/${year}` === filterValue;
            });

        setFilteredFactures(filtered);
        setDisplayFilteredFactures(filtered.length > 0); // S'affiche seulement s'il y a des factures filtrées
    };

    // Fonction pour changer le type de filtre
    const handleChangeFilterType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(e.target.value as FilterType);
        setDisplayFilteredFactures(false);
    }

    return (
        <div className={style.factureManager}>
            <div className={style.filterSelector}>
                {displayFilteredFactures && <button className={style.returnBtn} onClick={() => setDisplayFilteredFactures(false)}>
                    <Image src="/images/arrow_back.svg" alt="Retour" width={24} height={24} />
                </button>}
                <p>Filtrer les factures :</p>
                <select
                    value={filterType}
                    onChange={(e) => handleChangeFilterType(e)}
                >
                    <option value="byGuild">Par guilde</option>
                    <option value="byMonth">Par mois</option>
                </select>
            </div>

            {!displayFilteredFactures && <div className={style.filterList}>
                {filterType === "byGuild" &&
                    uniqueGuilds.map(({ name, status }) => (
                        <FactureFilterBtn
                            key={name}
                            value={name}
                            status={status}
                            onClick={() => handleFilterSelection(name)} // Filtrage lors du clic
                        />
                    ))
                }
                {filterType === "byMonth" &&
                    uniqueMonths.map(({ monthYear, status }) => (
                        <FactureFilterBtn
                            key={monthYear}
                            value={monthYear}
                            status={status}
                            onClick={() => handleFilterSelection(monthYear)} // Filtrage lors du clic
                        />
                    ))
                }
            </div>}

            {displayFilteredFactures && (
                <FactureLister factures={filteredFactures} />
            )}
        </div>
    );
};

export default FactureManager;
