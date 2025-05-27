import { RefObject, InputHTMLAttributes } from 'react';
import UITextInput from './UITextInput';

const firstnameConditions = {
    regex: /^[A-ZÀÉÈÙÊËÔ][A-Za-z0-9àéèùêëôÀÉÈÙÊËÔ]{3,}$/,
    error: "Le nom doit commencer par une lettre majuscule et contenir au moins 4 caractères (lettre ou chiffre), sans espaces ni caractères spéciaux."
};
/**
 * Propriétés pour le composant UIGuildnameInput.
 * @typedef {Object} UIFirstnameInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 */
export type UIGuildNameInputProps = {
    inputRef?: RefObject<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * Composant spécifique pour saisir un nom de guilde, avec des règles de validation prédéfinies.
 * 
 * @param {UIFirstnameInputProps} props - Propriétés pour configurer l'input du prénom.
 * @returns {JSX.Element} Un champ de saisie pour le prénom avec des règles de validation spécifiques.
 */
const UIGuildNameInput = ({ inputRef, className, ...rest }: UIGuildNameInputProps) => {
    return (
        <UITextInput
            inputRef={inputRef}
            placeholder='ex : Collectif85'
            className={`UIGuildNameInput ${className || ''}`}
            conditions={firstnameConditions}
            minLength={3} 
            maxLength={20}
            {...rest}
        />
    );
};

export default UIGuildNameInput;