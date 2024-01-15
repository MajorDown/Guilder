import { useState, useEffect, RefObject } from 'react';

export type Condition = {
    regex: RegExp;
    error: string;
};

export type UITextInputProps = {
    ariaLabel?: string,
    conditions: Condition[];
    inputRef: RefObject<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>;

const UITextInput = (props: UITextInputProps) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        let isValid: boolean = true;
        if (newValue === '') {
            setValue('');
            setError('');
            return;
        }
        for (const condition of props.conditions) {
            if (!condition.regex.test(newValue)) {
                setError(condition.error);
                isValid = false;
                break;
            }
        }
        if (isValid) {
            setValue(newValue);
            setError('');
        }
};

    return (
        <div>
            <input 
                id={props.id}
                className={`UITextInput ${props.className}`}
                name={props.name}
                aria-label={props.ariaLabel}
                ref={props.inputRef}
                value={value} 
                onChange={handleChange}
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UITextInput;