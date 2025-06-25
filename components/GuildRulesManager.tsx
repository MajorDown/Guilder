import { ConnectedAdmin, GuildRules } from "@/types";
import { useState, useEffect } from "react";
import GuildRuleCard from "./GuildRuleCard";
import updateGuildRules from "@/tools/front/updateGuildRules";

type GuildRulesManagerProps = {
    admin: ConnectedAdmin;
    rules: GuildRules | [];
    onUpdate: (rules: GuildRules) => void;
}

const GuildRulesManager = (props: GuildRulesManagerProps) => {
    const [initialRules, setInitialRules] = useState<GuildRules>(props.rules);
    const [rules, setRules] = useState<GuildRules>(props.rules);
    const [rulesChanged, setRulesChanged] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (JSON.stringify(initialRules) === JSON.stringify(rules)) setRulesChanged(false);
        else setRulesChanged(true);
    }, [initialRules, rules]);

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

    const handleDeleteRule = (index: number) => {
        const newRules = [...rules];
        newRules.splice(index, 1);
        setRules(newRules);
    }

    const handleSaveChanges = async () => {
        if (props.admin) {
            const response = await updateGuildRules(rules, props.admin);
            if (response instanceof Error) {
                setError("Erreur lors de la sauvegarde des règles");
                setTimeout(() => setError(""), 5000);
            }
            else {
                setInitialRules(rules);
                setError("");
            };
        }
    }

    return (
        <div id={"guildRulesManager"}>
            {rulesChanged && <button className={"light"} onClick={() => handleSaveChanges()}>sauvegarder les changements</button>}
            {error && <p className={"formErrorMsg"}>{error}</p>}
            {rules.length === 0 && <p>Aucune règle n'a pour le moment été rédigée</p>}
            {rules && rules.map((rule, index) => 
                <GuildRuleCard 
                    key={index}
                    rule={rule} 
                    onDelete={(index) => handleDeleteRule(index)}
                    onChange={(newRule) => handleChangeRule(index, newRule)}
                />
            )}
            <button className={"light"} onClick={() => handleCreateRule()}>ajouter une règle</button>
        </div>
    )
}

export default GuildRulesManager;