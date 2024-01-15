import React, { RefObject } from 'react';
import UITextInput, { Condition } from './UITextInput';

const lastnameConditions: Condition[] = [
    { regex: /^[A-ZÀ-Ý][A-Za-zà-ÿ '-]*$/, error: "La première lettre doit être une majuscule." },
    { regex: /^[A-Za-zéèêàù '-]+$/, error: "Uniquement des lettres, espaces, apostrophes et tirets." },
];

export type UILastnameInputProps = {
    inputRef: RefObject<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>;

const UILastnameInput = ({ inputRef, className, ...rest }: UILastnameInputProps) => {
    return (
        <UITextInput
            inputRef={inputRef}
            placeholder='ex : Jean-Claude'
            className={`UIFirstnameInput ${className || ''}`}
            conditions={lastnameConditions}
            minLength={3} 
            maxLength={20}
            {...rest}
        />
    );
};

export default UILastnameInput;