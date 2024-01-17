import React, { RefObject } from 'react';
import UITextInput from './UITextInput';

const firstnameConditions = {
    regex: /^[A-ZÀ-Ý][A-Za-zéèêàù '-]*$/,
    error: "La première lettre doit être une majuscule. Uniquement des lettres, des espaces et des tirets sont autorisés."
};

export type UIFirstnameInputProps = {
    inputRef: RefObject<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>;

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