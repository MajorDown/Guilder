import { useState, useRef, FormEvent } from "react";
import UIButton from "./UI/UIButton";
import UIOptionNameInput from "./UI/UIOptionNameInput";
import UIOptionEnableCheckbox from "./UI/UIOptionEnableCheckBox";
import UIOptionCoefInput from "./UI/UIOptionCoefInput";
import { GuildConfig, ConnectedAdmin } from "@/types";
import updateGuildConfig from "@/tools/front/updateGuildConfig";

type ConfigOptionsFormProps = {
    configFor: ConnectedAdmin;
    guildConfig: GuildConfig | undefined;
    setGuildConfig: (config: GuildConfig) => void;
    closeForm: () => void;
};

/**
 * @module ConfigOptionsForm
 * @description Permet de créer une nouvelle option pour la config de la guilde.
 */
const ConfigOptionsForm = ({ configFor, guildConfig, setGuildConfig, closeForm }: ConfigOptionsFormProps) => {
    // REFS
    const optionNameRef = useRef<HTMLInputElement>(null);
    const optionCoefRef = useRef<HTMLInputElement>(null);
    const optionEnableCheckboxRef = useRef<HTMLInputElement>(null);

    // STATES
    const [newOptionError, setNewOptionError] = useState<string>("");

    const handleSubmitNewOption = async (event: FormEvent) => {
        event.preventDefault();
        if (optionNameRef.current && optionCoefRef.current && optionEnableCheckboxRef.current) {
            const optionName = optionNameRef.current.value;
            const optionCoef = parseFloat(optionCoefRef.current.value);
            const optionEnabled = optionEnableCheckboxRef.current.checked;

            if (!guildConfig) return;

            // Vérification si l'option existe déjà
            const alreadyExist = guildConfig.config.some((option) => option.option === optionName);
            if (alreadyExist) {
                setNewOptionError("Cette option existe déjà. Veuillez renommer votre nouvelle option.");
                setTimeout(() => setNewOptionError(""), 5000);
                return;
            }

            // Ajout de la nouvelle option
            const updatedConfig = {
                ...guildConfig,
                config: [...guildConfig.config, { option: optionName, coef: optionCoef, enabled: optionEnabled }],
            };

            const response = await updateGuildConfig(configFor, updatedConfig);
            if (response instanceof Response) {
                const newData = await response.json();
                if (newData) {
                    setGuildConfig(newData);
                    closeForm();
                }
            } else {
                setNewOptionError("Un problème est survenu lors de la création de l'option. Veuillez réessayer plus tard.");
                setTimeout(() => setNewOptionError(""), 5000);
            }
        }
    };

    return (
        <form onSubmit={handleSubmitNewOption}>
            <div className="wrapper-horizontal">
                <div className="wrapper-vertical">
                    <label htmlFor="optionName">Nom de la nouvelle option :</label>
                    <UIOptionNameInput inputRef={optionNameRef} required />
                </div>
                <div className="wrapper-vertical">
                    <label htmlFor="optionCoef">Coef à appliquer :</label>
                    <UIOptionCoefInput inputRef={optionCoefRef} required />
                </div>
            </div>
            <div className="wrapper-horizontal">
                <label htmlFor="optionIsEnable">Rendre cette option utilisable dessuite :</label>
                <UIOptionEnableCheckbox inputRef={optionEnableCheckboxRef} />
            </div>
            <div className="wrapper-horizontal">
                <UIButton className="light" type="submit">Valider l'option</UIButton>
                <UIButton className="green" type="button" onClick={closeForm}>Annuler</UIButton>
            </div>
            {newOptionError && <p className="formErrorMsg">{newOptionError}</p>}
        </form>
    );
};

export default ConfigOptionsForm;
