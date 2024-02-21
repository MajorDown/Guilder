import { useState, RefObject, useEffect } from 'react';

/**
 * Propriétés pour le composant UITextInput.
 * @typedef {Object} UITextInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {string} [ariaLabel] - Label ARIA pour l'accessibilité de l'input.
 * @property {Object} conditions - Conditions pour la validation de l'input.
 * @property {RegExp} conditions.regex - Expression régulière pour la validation.
 * @property {string} conditions.error - Message d'erreur si la validation échoue.
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 * @property {function(string): void} [onChangeInputValue] - Fonction de rappel lors du changement de valeur.
 */
export type UITextInputProps = {
    ariaLabel?: string,
    conditions: {
        regex: RegExp,
        error: string
    }
    inputRef?: RefObject<HTMLInputElement>;
    onChangeInputValue?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Composant pour un champ de saisie de texte avec validation basée sur une expression régulière.
 *
 * @param {UITextInputProps} props - Propriétés pour configurer l'input de texte.
 * @returns {JSX.Element} Un champ de saisie de texte avec validation.
 */
const UITextInput = (props: UITextInputProps) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const regexToPattern = (regex: RegExp): string => {
        return regex.toString().replace(/^\/|\/$/g, '');
    }

    useEffect(() => {
        if(value === '') setError(false);
        else if (!props.conditions.regex.test(value)) setError(true);
        if (props.conditions.regex.test(value)) setError(false);
        props.onChangeInputValue && props.onChangeInputValue(value);
    }, [value])

    return (
        <div className={`UITextInput ${props.className}`}>
            <input 
                id={props.id}
                className={`UITextInput ${props.className}`}
                name={props.name}
                aria-label={props.ariaLabel}
                ref={props.inputRef}
                value={value} 
                onChange={(event) => setValue(event.target.value)}
                pattern={regexToPattern(props.conditions.regex)}
                title={props.conditions.error}
                placeholder={props.placeholder}
                minLength={props.minLength}
                maxLength={props.maxLength}
                disabled={props.disabled}
                required={props.required}
                autoComplete={props.autoComplete}
                spellCheck={props.spellCheck}
                style={{
                    ...(value ? (error ? {
                        backgroundColor: "#ff00003e",
                        borderColor: "#750909"
                    } : {
                        backgroundColor: "#7bff003e",
                        borderColor: "#2a5205"
                    }) : {}),
                    ...props.style
                }}
            />
        </div>
    );
};

export default UITextInput;