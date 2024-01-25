import { useState, useEffect, RefObject, ChangeEvent } from 'react';
/**
 * Propriétés pour le composant UIEmailInput.
 * @typedef {Object} UITextInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {string} [ariaLabel] - Label ARIA pour l'accessibilité de l'input.
 * @property {Object} conditions - Conditions pour la validation de l'input.
 * @property {RegExp} conditions.regex - Expression régulière pour la validation.
 * @property {string} conditions.error - Message d'erreur si la validation échoue.
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 * @property {function(string): void} [onChangeInputValue] - Fonction de rappel lors du changement de valeur.
 */
export type UIEmailInputProps = {
    ariaLabel?: string,
    inputRef?: RefObject<HTMLInputElement>;
    onChangeInputValue?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Composant pour un champ de saisie d'adresse email avec validation basée sur une expression régulière.
 *
 * @param {UITextInputProps} props - Propriétés pour configurer l'input email.
 * @returns {JSX.Element} Un champ de saisie de texte avec validation.
 */
const UIEmailInput = (props: UIEmailInputProps) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<boolean>(false);

    const conditions = /^\S{3,}@\S{3,}\.\S{2,}$/

    useEffect(() => {
        if (email === '') setError(false);
        if (!conditions.test(email)) setError(true);
        if (conditions.test(email)) setError(false);
        props.onChangeInputValue && props.onChangeInputValue(email);
    }, [email])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        props.onChangeInputValue && props.onChangeInputValue(event.target.value);
    };

    return (
        <input
            type="email"
            id={props.id}
            className={`UIEmailInput ${props.className}`}
            name={props.name}
            aria-label={props.ariaLabel}
            ref={props.inputRef}
            value={email} 
            onChange={(event) => handleInputChange(event)}
            placeholder={"votre email"}
            minLength={props.minLength}
            maxLength={props.maxLength}
            disabled={props.disabled}
            required={props.required}
            autoComplete={props.autoComplete}
            spellCheck={props.spellCheck}
            style={{
                ...(email ? 
                    (error ? {
                        backgroundColor: "#ff00003e",
                        borderColor: "#750909"
                    } : {
                        backgroundColor: "#7bff003e",
                        borderColor: "#2a5205"
                    }) : {}),
                ...props.style
            }}
        />
    );
};

export default UIEmailInput;
