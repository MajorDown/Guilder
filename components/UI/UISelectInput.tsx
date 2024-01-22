import { InputHTMLAttributes, RefObject, useState } from "react";

/**
 * Propriétés du composant UISelectInput.
 * @typedef {Object} UISelectInputProps
 * @property {function(string): void} [onChangeInputValue] - Fonction de rappel pour le changement de valeur de l'input.
 * @property {string} [ariaLabel] - Label ARIA pour l'accessibilité de l'input.
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} - Attributs HTML standards pour l'input.
 */
export type UISelectInputProps = {
    options: {
        name: string,
        value: any
    }[];
    ariaLabel?: string;
    inputRef?: RefObject<HTMLSelectElement>;
    onChangeInputValue?: (value: string) => void;
} & InputHTMLAttributes<HTMLSelectElement>;

/**
 * Composant proposant la sélection d'une option, incluant une validation.
 * 
 * @param {UISelectInputProps} props - Propriétés pour configurer l'input.
 * @returns {JSX.Element} Un champ de saisie de mot de passe stylisé avec validation.
 */
const UISelectInput = (props: UISelectInputProps) => {
    const [value, setValue] = useState<string>('');

    return (
        <select 
            id={props.id}
            className={`UIPasswordInput ${props.className}`}
            name={props.name || "password"}
            aria-label={props.ariaLabel}
            ref={props.inputRef}
            value={value} 
            onChange={(event) => setValue(event.target.value)}
            disabled={props.disabled}
            required={props.required}
            autoComplete={props.autoComplete}
            spellCheck={props.spellCheck}
            style={{
                ...(value ? ({
                    backgroundColor: "#7bff003e",
                    borderColor: "#2a5205"
                }) : {}),
                ...props.style
            }}
            >
            {props.options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default UISelectInput;
