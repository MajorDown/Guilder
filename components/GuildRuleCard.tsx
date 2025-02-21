import Image from "next/image";
import { useState } from "react";
import UIButton from "./UI/UIButton";

export type GuildRuleCardProps = {
    key: number;
    rule: string
    onDelete: (index: number) => void;
    onChange: (rule: string) => void;
}

const GuildRuleCard = (props: GuildRuleCardProps ) => {
    const [actualRule, setActualRule] = useState<string>(props.rule);

    const handleChange = (newRule: string) => {
        setActualRule(newRule);
        props.onChange(newRule)
    }

    return (
        <div className={"guildRuleCard"}>
            <textarea
                cols={50}
                rows={3}
                value={actualRule}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="nouvelle règle"
            />
            <UIButton style={{minWidth: "50px", marginLeft: "5px"}} onClick={() => props.onDelete(props.key)}>
                <Image src="/images/icons/trash-white.svg" alt="supprimer" width={24} height={24}/>
            </UIButton>           
        </div>
    )
}

export default GuildRuleCard;