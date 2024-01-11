import React, { useState, useEffect, RefObject } from 'react';

export type Condition = {
    regex: RegExp;
    error: string;
};

export type TextInputProps = {
    conditions: Condition[];
    inputRef: RefObject<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>;

const UITextInput = (props: TextInputProps) => {
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
                className={`UITextInput ${props.className}`}
                ref={props.inputRef}
                value={value} 
                onChange={handleChange}
                {...props}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UITextInput;