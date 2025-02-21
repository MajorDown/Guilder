import getGuildConfig from "@/tools/front/getGuildConfig";
import { ConnectedAdmin, GuildConfig, GuildRules } from "@/types";
import { useState, useEffect } from "react";
import GuildRuleCard from "./GuildRuleCard";

type GuildRulesManagerProps = {
    admin: ConnectedAdmin;
}

const GuildRulesManager = (props: GuildRulesManagerProps) => {
    const [initialRules, setInitialRules] = useState<GuildRules>([]);
    const [rules, setRules] = useState<GuildRules>([]);
    const [rulesChanged, setRulesChanged] = useState<boolean>(false);

    useEffect(() => {
        if (initialRules === rules) setRulesChanged(false);
        else setRulesChanged(true);
    }, [initialRules, rules]);

    useEffect(() => {
        const getRules = async () => {
            const response = await getGuildConfig(props.admin) as GuildConfig | Error;
            if (response instanceof Error) {
                setRules([]);
                setInitialRules([]);
            }
            else {
                setRules(response.rules || []);
                setInitialRules(response.rules || []);
            }
        }
        getRules();
    }, [props.admin]);

    const handleChangeRule = (index: number, newRule: string) => {
        const newRules = [...rules];
        newRules[index] = newRule;
        setRules(newRules);
    }

    const handleCreateRule = () => {
        const newRules = [...rules];
        newRules.push("");
        setRules(newRules);
    }

    return (
        <div id={"guildRulesManager"}>
            {rulesChanged && <button className={"light"}>sauvegarder les changements</button>}
            {rules.length === 0 && <p>Aucune règle n'a pour le moment été rédigée</p>}
            {rules && rules.map((rule, index) => 
                <GuildRuleCard 
                    key={index}
                    rule={rule} 
                    onDelete={(index) => console.log(index)}
                    onChange={(index, rule) => handleChangeRule(index, rule)}
                />
            )}
            <button className={"light"} onClick={() => handleCreateRule()}>ajouter une règle</button>
        </div>
    )
}

export default GuildRulesManager;