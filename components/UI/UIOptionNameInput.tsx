import { RefObject, InputHTMLAttributes } from 'react';
import UITextInput from './UITextInput';

const OptionNameConditions = {
    regex: /^[A-Za-z0-9àéèùêëôâîïçÀÉÈÙÊËÔÂÎÏÇ\s]{3,}$/,
    error: "Veuillez saisir au moins 3 caractères, pouvant inclure des lettres (avec ou sans accents), des chiffres et des espaces, sans autre caractères spéciaux."
};
/**
 * Propriétés pour le composant UIOptionNameInput.
 * @typedef {Object} UIOptionNameInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 */
export type UIOptionNameInputProps = {
    inputRef: RefObject<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * Composant spécifique pour saisir un nom d'option, avec des règles de validation prédéfinies.
 * 
 * @param {UIFirstnameInputProps} props - Propriétés pour configurer l'input du prénom.
 * @returns {JSX.Element} Un champ de saisie pour le prénom avec des règles de validation spécifiques.
 */
const UIOptionNameInput = ({ inputRef, className, ...rest }: UIOptionNameInputProps) => {
    return (
        <UITextInput
            inputRef={inputRef}
            placeholder='ex : Tracteur semoir'
            className={`UIGuildNameInput ${className || ''}`}
            conditions={OptionNameConditions}
            minLength={3} 
            maxLength={20}
            {...rest}
        />
    );
};

export default UIOptionNameInput;