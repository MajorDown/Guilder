import { useState, useRef, FormEvent } from "react";
import UIButton from "./UI/UIButton";
import UIOptionNameInput from "./UI/UIOptionNameInput";
import UIOptionEnableCheckbox from "./UI/UIOptionEnableCheckBox";
import UIOptionCoefInput from "./UI/UIOptionCoefInput";
import { GuildConfig, ConnectedAdmin, Tool } from "@/types";
import updateGuildConfig from "@/tools/front/updateGuildConfig";

type ConfigUpdateFormProps = {
    configFor: ConnectedAdmin;
    guildConfig: GuildConfig | undefined;
    setGuildConfig: (config: GuildConfig) => void;
    optionToUpdate: Tool;
    closeForm: () => void;
};

/**
 * @module ConfigUpdateForm
 * @description Permet de modifier une option pour la config de la guilde.
 */
const ConfigUpdateForm = (props: ConfigUpdateFormProps) => {
    // REFS
    const optionNameRef = useRef<HTMLInputElement>(null);
    const optionCoefRef = useRef<HTMLInputElement>(null);
    const optionEnableCheckboxRef = useRef<HTMLInputElement>(null);

    // STATES
    const [optionName, setOptionName] = useState<string>(props.optionToUpdate.option);
    const [optionCoef, setOptionCoef] = useState<number>(props.optionToUpdate.coef);
    const [optionEnabled, setOptionEnabled] = useState<boolean>(props.optionToUpdate.enabled);
    const [updateOptionError, setUpdateOptionError] = useState<string>("");

    const handleSubmitUpdatedOption = async (event: FormEvent) => {
        event.preventDefault();
        // vérification des valeurs des inputs
        if (!optionNameRef.current || !optionCoefRef.current || !optionEnableCheckboxRef.current) {
            setUpdateOptionError("Veuillez remplir tous les champs avec des données corrects.");
            setTimeout(() => setUpdateOptionError(""), 5000);
            return;
        }
        // modification de l'option
        const newOptionName = optionNameRef.current.value;
        const newOptionCoef = parseFloat(optionCoefRef.current.value);
        const newOptionEnabled = optionEnableCheckboxRef.current.checked;
        if (!props.guildConfig) return;
        const updatedConfig = {
            ...props.guildConfig,
            config: props.guildConfig.config.map((option) => {
                if (option.option === props.optionToUpdate.option) {
                    return { option: newOptionName, coef: newOptionCoef, enabled: newOptionEnabled };
                }
                return option;
            }),
        };
        const response = await updateGuildConfig(props.configFor, updatedConfig);
        if (response instanceof Response) {
            const newData = await response.json();
            if (newData) {
                props.setGuildConfig(newData);
                props.closeForm();
            }
        } else {
            setUpdateOptionError("Un problème est survenu lors de la modification de l'option. Veuillez réessayer plus tard.");
            setTimeout(() => setUpdateOptionError(""), 5000);
        }
    };

    return (
        <form onSubmit={handleSubmitUpdatedOption}>
            <p>Modification de l'option "{props.optionToUpdate.option}" :</p>
            <div className="wrapper-horizontal">
                <div className="wrapper-vertical">
                    <label htmlFor="optionName">Nom actuel de l'option :</label>
                    <UIOptionNameInput 
                        inputRef={optionNameRef} 
                        value={optionName} 
                        onChange={(e) => setOptionName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="wrapper-vertical">
                    <label htmlFor="optionCoef">Coef à appliquer :</label>
                    <UIOptionCoefInput 
                        inputRef={optionCoefRef} 
                        value={optionCoef}
                        onChange={(e) => setOptionCoef(parseFloat(e.target.value))}
                        required 
                    />
                </div>
            </div>
            <div className="wrapper-horizontal">
                <label htmlFor="optionIsEnable">Rendre cette option utilisable dessuite :</label>
                <UIOptionEnableCheckbox 
                    inputRef={optionEnableCheckboxRef} 
                    checked={optionEnabled}
                    onChange={(e) => setOptionEnabled(e.target.checked)}
                    />
            </div>
            <div className="wrapper-horizontal">
                <UIButton className="light" type="submit">Modifier l'option</UIButton>
                <UIButton className="green" type="button" onClick={props.closeForm}>Annuler</UIButton>
            </div>
            {updateOptionError && <p className="formErrorMsg">{updateOptionError}</p>}
        </form>
    );
};

export default ConfigUpdateForm;
