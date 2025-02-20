import { useMemberContext } from "@/contexts/memberContext";
import getGuildConfig from "@/tools/front/getGuildConfig";
import { ConnectedMember, GuildRules } from "@/types";
import { useState } from "react";

type GuildRulesViewerProps = {
    member: ConnectedMember;
}

const GuildRulesViewer = (props: GuildRulesViewerProps) => {
    const [rules, setRules] = useState<GuildRules>([]);

    const guildConfig = getGuildConfig(props.member);

    return (
        <div id={"guildRulesViewer"}>

        </div>
    )
}

export default GuildRulesViewer;