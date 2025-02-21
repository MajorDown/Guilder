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
                setRules([]);
            }
            else setRules(response.rules || [])
        }
        getRules();
    }, [props.member]);

    return (
        <div id={"guildRulesViewer"}>
            {rules.length === 0 && <p>Aucune règle n'a pour le moment été rédigée</p>}
            {rules.length > 0 && <ul>
                {rules && rules.map((rule, index) => <li key={index}>{rule}</li>)}
            </ul>}
        </div>
    )
}

export default GuildRulesViewer;