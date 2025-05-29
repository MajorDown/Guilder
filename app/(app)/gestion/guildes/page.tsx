'use client'
import { useState, useEffect} from "react"
import PageForManager from "@/components/manager/PageForManager"
import CreateGuildForm from "@/components/manager/createGuildForm";
import Style from "@/styles/components/manager/listFilters.module.css"
import UISelectInput, { UISelectOptionsList} from "@/components/UI/UISelectInput";
import { useManagerContext } from "@/contexts/managerContext";
import getAllGuildsNames from "@/tools/front/guildConfig/getAllGuildsNames";
import { ConnectedManager } from "@/types";

const ManageGuildes = (): JSX.Element => {
    const {manager} = useManagerContext();
    const [showCreateGuildForm, setShowCreateGuildForm] = useState(false);
    const [guildsNames, setGuildsNames] = useState<UISelectOptionsList>();
    const [selectedGuildName, setSelectedGuildName] = useState<string>("");

    useEffect(() => {
        const fetchGuildsNames = async () => {
            try {
                const names = await getAllGuildsNames(manager as ConnectedManager);
                setGuildsNames(names.map(name => ({ name, value: name })));
            } catch (error) {
                console.error("Failed to fetch guilds names:", error);
            }
        }
        fetchGuildsNames();
    }, [])


    useEffect(() => {
        console.log("selectedGuildName changed:", selectedGuildName);
    }, [selectedGuildName]);

    return (
        <PageForManager id={""} title={"Résumé de l'activité des guildes"}>
            <>
                {!showCreateGuildForm && <button className={"light"} onClick={() => setShowCreateGuildForm(true)}>Créer une nouvelle guilde</button>}
                {showCreateGuildForm && <CreateGuildForm onClose={() => setShowCreateGuildForm(false)}/>}
                {!showCreateGuildForm && <>
                    <div className={Style.filters}>
                        <label>
                            {"Recherche par nom de guilde : "}                      
                        </label>
                        <UISelectInput
                            options={guildsNames || []}
                            onChangeInputValue={(value) => setSelectedGuildName(value)}
                            value={selectedGuildName}
                        />               
                    </div>
                    {selectedGuildName != "" && <p>nous allons rechercher la data pour la guilde {selectedGuildName}</p>}
                </>}
            </>
        </PageForManager>
    )
}

export default ManageGuildes