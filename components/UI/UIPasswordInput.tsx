import { useState, RefObject, useEffect, InputHTMLAttributes } from 'react';

/**
 * Propriétés du composant UIPasswordInput.
 * @typedef {Object} UIPasswordInputProps
 * @property {function(string): void} [onChangeInputValue] - Fonction de rappel pour le changement de valeur de l'input.
 * @property {string} [ariaLabel] - Label ARIA pour l'accessibilité de l'input.
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} - Attributs HTML standards pour l'input.
 */
export type UIPasswordInputProps = {
    ariaLabel?: string;
    inputRef?: RefObject<HTMLInputElement>;
    onChangeInputValue?: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * Ccomposant proposant la saisie d'un mots de passe, incluant une validation.
 * 
 * @param {UIPasswordInputProps} props - Propriétés pour configurer l'input.
 * @returns {JSX.Element} Un champ de saisie de mot de passe stylisé avec validation.
 */
const UIPasswordInput = (props: UIPasswordInputProps) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const regexToPattern = (regex: RegExp): string => {
        return regex.toString().replace(/^\/|\/$/g, '');
    }

    const conditions : {
        regex: RegExp,
        error: string
    } = {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
        error: "Votre mdp doit contenir au moins 10 caractères, avec au moins 1 chiffre, 1 lettre minuscule, 1 lettre majuscule et un caractère spécial (@, $, !, %, *, ?, ou &)"
    }

    useEffect(() => {
        if(value === '') setError(false)
        if(!conditions.regex.test(value)) setError(true);
        if(conditions.regex.test(value)) setError(false);
        props.onChangeInputValue && props.onChangeInputValue(value);
    }, [value])

    return (
        <input 
            type='password'
            id={props.id}
            className={`UIPasswordInput ${props.className? props.className : ""}`}
            name={props.name || "password"}
            aria-label={props.ariaLabel}
            ref={props.inputRef}
            value={value} 
            onChange={(event) => setValue(event.target.value)}
            pattern={regexToPattern(conditions.regex)}
            title={conditions.error}
            placeholder={"votre mot de passe"}
            minLength={props.minLength}
            maxLength={props.maxLength}
            disabled={props.disabled}
            required={props.required}
            autoComplete={props.autoComplete}
            spellCheck={props.spellCheck}
            style={{
                ...(value ? (error ? {
                    backgroundColor: "#ff7676",
                    borderColor: "#750909"
                } : {
                    backgroundColor: "#4fad4f",
                    borderColor: "#2a5205"
                }) : {}),
                ...props.style
            }}
        />
    );
};

export default UIPasswordInput;