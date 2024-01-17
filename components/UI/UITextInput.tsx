import { useState, RefObject, useEffect } from 'react';

export type UITextInputProps = {
    ariaLabel?: string,
    conditions: {
        regex: RegExp,
        error: string
    }
    inputRef: RefObject<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>;

const UITextInput = (props: UITextInputProps) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if(value === '') setError(false);
        if(!props.conditions.regex.test(value)) setError(true);
        if(props.conditions.regex.test(value)) setError(false);
    }, [value])

    const regexToPattern = (regex: RegExp): string => {
        return regex.toString().replace(/^\/|\/$/g, '');
    }

    return (
        <div className={`UITextInput ${props.className}`}>
            <input 
                id={props.id}
                className={`UITextInput ${props.className}`}
                name={props.name}
                aria-label={props.ariaLabel}
                ref={props.inputRef}
                value={value} 
                onChange={(event) => setValue(event.target.value)}
                pattern={regexToPattern(props.conditions.regex)}
                title={props.conditions.error}
                placeholder={props.placeholder}
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

export default UITextInput;