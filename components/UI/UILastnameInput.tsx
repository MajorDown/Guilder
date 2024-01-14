import UITextInput, { UITextInputProps, Condition } from './UITextInput';

const firstnameConditions: Condition[] = [
    { regex: /^[A-Za-z ]+$/, error: "Uniquement des lettres et des espaces" },
    { regex: /^.{3,20}$/, error: "Le nom doit avoir entre 3 et 30 caractères." }
];

const UILastnameInput = (props: UITextInputProps) => {

    return (
        <UITextInput
            className="UIFirstnameInput"
            inputRef={props.inputRef} 
            conditions={firstnameConditions}
        />
    );
};

export default UILastnameInput;