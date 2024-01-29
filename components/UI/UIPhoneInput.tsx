import { RefObject, InputHTMLAttributes} from 'react';
import UITextInput from './UITextInput';

const UIPhoneInputConditions = {
    regex: /^\d+$/,
    error: "Veuillez saisir uniquement des chiffres"
};
/**
 * Propriétés pour le composant UIPhoneInput.
 * @typedef {Object} UIFirstnameInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 */
export type UIGuildNameInputProps = {
    inputRef: RefObject<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * Composant spécifique pour saisir un nom de guilde, avec des règles de validation prédéfinies.
 * 
 * @param {UIFirstnameInputProps} props - Propriétés pour configurer l'input du prénom.
 * @returns {JSX.Element} Un champ de saisie pour le prénom avec des règles de validation spécifiques.
 */
const UIPhoneInput = ({ inputRef, className, ...rest }: UIGuildNameInputProps) => {
    return (
        <UITextInput
            inputRef={inputRef}
            placeholder='ex : 0607080910'
            className={`UIGuildNameInput ${className || ''}`}
            conditions={UIPhoneInputConditions}
            minLength={10} 
            maxLength={10}
            {...rest}
        />
    );
};

export default UIPhoneInput;