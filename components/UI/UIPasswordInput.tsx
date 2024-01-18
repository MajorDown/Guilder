import { useState, RefObject, useEffect } from 'react';
import regexToPattern from '@/tools/regexToPattern';

export type UIPasswordInputProps = {
    ariaLabel?: string;
    inputRef?: RefObject<HTMLInputElement>;
    onChangeInputValue?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const UIPasswordInput = (props: UIPasswordInputProps) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const conditions : {
        regex: RegExp,
        error: string
    } = {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
        error: "Votre mdp doit contenir au moins 10 caractères, avec au moins 1 chiffre, 1 lettre minuscule, 1 lettre majuscule et un caractère spécial (@, $, !, %, *, ?, ou &)"
    }

    useEffect(() => {
        if(value === '') setError(false)
        if(!conditions.regex.test(value)) setError(true);
        if(conditions.regex.test(value)) setError(false);
        props.onChangeInputValue && props.onChangeInputValue(value);
    }, [value])

    return (
        <div className={`UIPasswordInput ${props.className}`}>
            <input 
                type='password'
                id={props.id}
                className={`UIPasswordInput ${props.className}`}
                name={props.name}
                aria-label={props.ariaLabel}
                ref={props.inputRef}
                value={value} 
                onChange={(event) => setValue(event.target.value)}
                pattern={regexToPattern(conditions.regex)}
                title={conditions.error}
                placeholder={"votre mot de passe"}
                minLength={props.minLength}
                maxLength={props.maxLength}
                disabled={props.disabled}
                required={props.required}
                autoComplete={props.autoComplete}
                spellCheck={props.spellCheck}
                style={{
                    ...(value ? (error ? {
                        backgroundColor: "#ff00003e",
                        borderColor: "#750909"
                    } : {
                        backgroundColor: "#7bff003e",
                        borderColor: "#2a5205"
                    }) : {}),
                    ...props.style
                }}
            />
        </div>
    );
};

export default UIPasswordInput;