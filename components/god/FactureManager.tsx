import { Facture } from "@/types";
import { useState } from "react";
import style from '@/styles/components/FactureManager.module.css';
import FactureFilterBtn from "@/components/god/FactureFilterBtn";

type FilterType = "byGuild" | "byMonth";

type FactureManagerProps = {
    Factures: Facture[];
}

const FactureManager = (props: FactureManagerProps):JSX.Element => {
    const [filterType, setFilterType] = useState<FilterType>("byGuild");
    const [FilteredFactures, setFilteredFactures] = useState<Facture[]>([]);
    const [displayFilteredFactures, setDisplayFilteredFactures] = useState<boolean>(false);

    return (<div className={style.factureManager}>
        <div className={style.filterSelector}>
            <p>trier les factures :</p>
            <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as FilterType)}
            >
                <option value="byGuild">Par guilde</option>
                <option value="byMonth">Par mois</option>
            </select>
        </div>
        <div className={style.filterList}>
            {filterType === "byGuild" && props.Factures.map((facture) => {
                return <FactureFilterBtn key={facture.id} value={facture.client.name} />
            })}
            {filterType === "byMonth" && props.Factures.map((facture) => {
                return <FactureFilterBtn key={facture.id} value={facture.id.split("-")[1]} />
            })}
        </div>
    </div>)
}

export default FactureManager;