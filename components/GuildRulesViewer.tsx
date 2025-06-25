import { ConnectedMember, GuildRules } from "@/types";

type GuildRulesViewerProps = {
    rules: GuildRules | [];
}

const GuildRulesViewer = (props: GuildRulesViewerProps) => {

    return (
        <div id={"guildRulesViewer"}>
            {props.rules && props.rules.length === 0 && <p>Aucune règle n'a pour le moment été rédigée</p>}
            {props.rules && props.rules.length > 0 && <ul>
                {props.rules && props.rules.map((rule, index) => <li key={index}>{rule}</li>)}
            </ul>}
        </div>
    )
}

export default GuildRulesViewer;