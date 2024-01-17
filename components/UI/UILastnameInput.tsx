import React, { RefObject } from 'react';
import UITextInput from './UITextInput';

const lastnameConditions = {
    regex: /^[A-ZÀ-Ý][A-Za-zà-ÿ '-]*$/,
    error: "La première lettre doit être une majuscule. Uniquement des lettres, espaces, apostrophes et tirets sont autorisés."
};

export type UILastnameInputProps = {
    inputRef: RefObject<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>;

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