import { useState } from 'react';

// Définition des types pour les props
interface Condition {
    regex: RegExp;
    error: string;
}

interface TextInputProps {
    className?: string,
    id?: string,
    conditions: Condition[];
    isValid: (valid: boolean) => void;
}

const TextInput = (props: TextInputProps) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleBlur = () => {
        let foundError: string = '';
        props.conditions.forEach(condition => {
            if (!condition.regex.test(value)) {
                foundError = condition.error;
            }
        });
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
            />
            {error && <p>{error}</p>}
        </div>
  );
}

export default TextInput;
