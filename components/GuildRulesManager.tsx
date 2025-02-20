import getGuildConfig from "@/tools/front/getGuildConfig";
import { ConnectedAdmin, GuildConfig, GuildRules } from "@/types";
import { useState, useEffect } from "react";

type GuildRulesManagerProps = {
    admin: ConnectedAdmin;
}

const GuildRulesManager = (props: GuildRulesManagerProps) => {
    const [rules, setRules] = useState<GuildRules>([]);

    useEffect(() => {
        const getRules = async () => {
            const response = await getGuildConfig(props.admin) as GuildConfig | Error;
            if (response instanceof Error) {
                setRules(["Erreur lors de la récupération des données de la guilde"]);
            }
            else setRules(response.rules || ["Aucun règlement n'a été défini pour cette guilde"])
        }
        getRules();
    }, [props.admin]);

    return (
        <div id={"guildRulesManager"}>
            <p>guildRulesManager</p>
        </div>
    )
}

export default GuildRulesManager;