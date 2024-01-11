import UITextInput, { UITextInputProps, Condition } from './UITextInput';

const firstnameConditions: Condition[] = [
    { regex: /^[A-Za-z-]+$/, error: "Uniquement des lettres et des tirets." },
    { regex: /^.{3,30}$/, error: "Le nom doit avoir entre 3 et 30 caractères." }
];

const UIFirstnameInput = (props: UITextInputProps) => {

    return (
        <UITextInput
            className="UINameInput"
            inputRef={props.inputRef} 
            conditions={firstnameConditions}
            isValid={(props.isValid)}
        />
    );
};

export default UIFirstnameInput;