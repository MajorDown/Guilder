'use client'
import { useState, useEffect} from "react"
import PageForManager from "@/components/manager/PageForManager"
import CreateGuildForm from "@/components/manager/createGuildForm";
import Style from "@/styles/components/manager/listFilters.module.css"
import UISelectInput, { UISelectOptionsList} from "@/components/UI/UISelectInput";
import { useManagerContext } from "@/contexts/managerContext";
import getAllGuildsNames from "@/tools/front/guildConfig/getAllGuildsNames";
import { ConnectedManager } from "@/types";
import GuildDataViewer from "@/components/manager/GuildDataViewer";

const ManageGuildes = (): JSX.Element => {
    const {manager} = useManagerContext();
    const [showCreateGuildForm, setShowCreateGuildForm] = useState(false);
    const [guildsNames, setGuildsNames] = useState<UISelectOptionsList>([{ name: "Sélectionner une guilde", value: "" }]);
    const [selectedGuildName, setSelectedGuildName] = useState<string>("");

    useEffect(() => {
        const fetchGuildsNames = async () => {
            try {
                const names = await getAllGuildsNames(manager as ConnectedManager);
                // le tableau doit contenir un élément neutre suivi des noms trouvé
                if (names.length > 0) {
                    setGuildsNames([{ name: "Sélectionner une guilde", value: "" }, ...names.map(name => ({ name, value: name }))]);
                } else {
                    setGuildsNames([{ name: "Aucune guilde trouvée", value: "" }]);
                }
            } catch (error) {
                console.error("Failed to fetch guilds names:", error);
            }
        }
        fetchGuildsNames();
    }, [manager])

    return (
        <PageForManager id={""} title={"Résumé de l'activité des guildes"}>
            <>
                {!showCreateGuildForm && <button className={"light"} onClick={() => setShowCreateGuildForm(true)}>Créer une nouvelle guilde</button>}
                {showCreateGuildForm && <CreateGuildForm onClose={() => setShowCreateGuildForm(false)}/>}
                {!showCreateGuildForm && <>
                    <div className={Style.filters}>
                        <label>Recherche par nom de guilde :</label>
                        <UISelectInput
                            options={guildsNames || []}
                            onChangeInputValue={(value) => setSelectedGuildName(value)}
                            value={selectedGuildName}
                        />               
                    </div>
                    {selectedGuildName != "" && <GuildDataViewer guildName={selectedGuildName} />}
                </>}
            </>
        </PageForManager>
    )
}

export default ManageGuildes