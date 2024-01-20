import { useState, RefObject, ChangeEvent } from 'react';

export type UIEmailInputProps = {
    ariaLabel?: string,
    inputRef?: RefObject<HTMLInputElement>;
    onChangeInputValue?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const UIEmailInput = (props: UIEmailInputProps) => {
    const [email, setEmail] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = event.target.value;
        const updatedEmail = email.split('.');
        updatedEmail[index] = value;
        setEmail(updatedEmail.join('.'));
    };

    return (
        <div className={`UIEmailInput ${props.className}`}>
            <input
                type="text"
                value={email.split('@')[0]}
                onChange={(event) => handleInputChange(event, 0)}
            />
            @
            <input
                type="text"
                value={email.split('@')[1]?.split('.')[0]}
                onChange={(event) => handleInputChange(event, 1)}
            />
            .
            <input
                type="text"
                value={email.split('@')[1]?.split('.')[1]}
                onChange={(event) => handleInputChange(event, 2)}
            />
        </div>
    );
};

export default UIEmailInput;
