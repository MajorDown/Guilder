import React, { RefObject } from 'react';
import UITextInput from './UITextInput';

const SocietynameConditions = {
    regex: /^[A-ZÉÈÊËÙÔ][A-Za-zéèêëùô \-]*$/,
    error: "La première lettre doit être une majuscule. Uniquement des lettres, des espaces et des tirets sont autorisés."
};
/**
 * Propriétés pour le composant UISocietynameInput.
 * @typedef {Object} UISocietynameInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 */
export type UISocietynameInputProps = {
    inputRef: RefObject<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Composant spécifique pour saisir un prénom, avec des règles de validation prédéfinies.
 * 
 * @param {UISocietynameInputProps} props - Propriétés pour configurer l'input du prénom.
 * @returns {JSX.Element} Un champ de saisie pour le prénom avec des règles de validation spécifiques.
 */
const UISocietynameInput = ({ inputRef, className, ...rest }: UISocietynameInputProps) => {
    return (
        <UITextInput
            inputRef={inputRef}
            placeholder='ex : SAS Dupont'
            className={`UISocietynameInput ${className || ''}`}
            conditions={SocietynameConditions}
            minLength={3} 
            maxLength={40}
            {...rest}
        />
    );
};

export default UISocietynameInput;
