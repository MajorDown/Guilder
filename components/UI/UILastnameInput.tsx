import React, { RefObject } from 'react';
import UITextInput from './UITextInput';

const lastnameConditions = {
    regex: /^[A-ZÉÈÊËÙÔ][A-Za-zéèêëùô'\-]*$/,
    error: "La première lettre doit être une majuscule. Uniquement des lettres, espaces, apostrophes et tirets sont autorisés."
};

/**
 * Propriétés pour le composant UILastnameInput.
 * @typedef {Object} UILastnameInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 */
export type UILastnameInputProps = {
    inputRef: RefObject<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Composant spécifique pour saisir un nom de famille, avec des règles de validation prédéfinies.
 * 
 * @param {UILastnameInputProps} props - Propriétés pour configurer l'input du nom de famille.
 * @returns {JSX.Element} Un champ de saisie pour le nom de famille avec des règles de validation spécifiques.
 */
const UILastnameInput = ({ inputRef, className, ...rest }: UILastnameInputProps) => {
    return (
        <UITextInput
            inputRef={inputRef}
            placeholder='ex : De Vilaine'
            className={`UIFirstnameInput ${className || ''}`}
            conditions={lastnameConditions}
            minLength={3} 
            maxLength={20}
            {...rest}
        />
    );
};

export default UILastnameInput;

