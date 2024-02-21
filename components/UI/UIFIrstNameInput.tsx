import React, { RefObject } from 'react';
import UITextInput from './UITextInput';

const firstnameConditions = {
    regex: /^[A-ZÉÈÊËÙÔ][A-Za-zéèêëùô\-]*$/,
    error: "La première lettre doit être une majuscule. Uniquement des lettres, des espaces et des tirets sont autorisés."
};
/**
 * Propriétés pour le composant UIFirstnameInput.
 * @typedef {Object} UIFirstnameInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 */
export type UIFirstnameInputProps = {
    inputRef: RefObject<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Composant spécifique pour saisir un prénom, avec des règles de validation prédéfinies.
 * 
 * @param {UIFirstnameInputProps} props - Propriétés pour configurer l'input du prénom.
 * @returns {JSX.Element} Un champ de saisie pour le prénom avec des règles de validation spécifiques.
 */
const UIFirstnameInput = ({ inputRef, className, ...rest }: UIFirstnameInputProps) => {
    return (
        <UITextInput
            inputRef={inputRef}
            placeholder='ex : Jean-Claude'
            className={`UIFirstnameInput ${className || ''}`}
            conditions={firstnameConditions}
            minLength={3} 
            maxLength={20}
            {...rest}
        />
    );
};

export default UIFirstnameInput;