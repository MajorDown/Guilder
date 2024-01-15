import React, { RefObject } from 'react';
import UITextInput, { Condition } from './UITextInput';

const firstnameConditions: Condition[] = [
    { regex: /^[A-ZÀ-Ý][A-Za-zà-ÿ '-]*$/, error: "La première lettre doit être une majuscule." },
    { regex: /^[A-Za-zéèêàù-]+$/, error: "Uniquement des lettres et des tirets." },
];

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