import { Facture } from "@/types";
import { useState, useMemo } from "react";
import style from '@/styles/components/FactureManager.module.css';
import FactureFilterBtn from "@/components/god/FactureFilterBtn";

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

    return (
        <div className={style.factureManager}>
            <div className={style.filterSelector}>
                <p>Filtrer les factures :</p>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as FilterType)}
                >
                    <option value="byGuild">Par guilde</option>
                    <option value="byMonth">Par mois</option>
                </select>
            </div>

            <div className={style.filterList}>
                {filterType === "byGuild" &&
                    uniqueGuilds.map(({ name, status }) => (
                        <FactureFilterBtn key={name} value={name} status={status} />
                    ))
                }
                {filterType === "byMonth" &&
                    uniqueMonths.map(({ monthYear, status }) => (
                        <FactureFilterBtn key={monthYear} value={monthYear} status={status} />
                    ))
                }
            </div>
        </div>
    );
};

export default FactureManager;
