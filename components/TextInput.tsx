import { useState, InputHTMLAttributes } from 'react';

type Condition = {
    regex: RegExp;
    error: string;
}

type TextInputProps = {
    conditions: Condition[];
    isValid: (valid: boolean) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = (props: TextInputProps) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleBlur = () => {
        let foundError: string = '';
        for (const condition of props.conditions) {
            if (!condition.regex.test(value)) {
                foundError = condition.error;
                break;
            }
        }
        setError(foundError);
        props.isValid(!foundError);
    };
    
    return (
        <div 
            className={`textinput ${props.className}`}
            id={props.id}
        >
            <input 
                value={value} 
                onChange={(event) => setValue(event.target.value)}
                onBlur={() => handleBlur()}
                style={error ? 
                    {background: "#e7adad", borderColor: "#d23737"} : 
                    {background: "#94d2a4", borderColor: "#1c8f39"}
                }
            />
            {error && <p style={{color: "#750909"}}>{error}</p>}
        </div>
  );
}

export default TextInput;
