import getGuildConfig from "@/tools/front/getGuildConfig";
import { ConnectedMember, GuildConfig, GuildRules } from "@/types";
import { useState, useEffect } from "react";

type GuildRulesViewerProps = {
    member: ConnectedMember;
}

const GuildRulesViewer = (props: GuildRulesViewerProps) => {
    const [rules, setRules] = useState<GuildRules>([]);

    useEffect(() => {
        const getRules = async () => {
            const response = await getGuildConfig(props.member) as GuildConfig | Error;
            if (response instanceof Error) {
                setRules(["Erreur lors de la récupération des données de la guilde"]);
            }
            else setRules(response.rules || ["Aucun règlement n'a été défini pour cette guilde"])
        }
        getRules();
    }, [props.member]);

    return (
        <div id={"guildRulesViewer"}>
            <p>kikou</p>
            <ul>
                {rules && rules.map((rule, index) => <li key={index}>{rule}</li>)}
            </ul>
        </div>
    )
}

export default GuildRulesViewer;