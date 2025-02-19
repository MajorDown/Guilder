import React, { useState, RefObject, InputHTMLAttributes } from 'react';

/**
 * Propriétés pour le composant UICounterInput.
 * @typedef {Object} UIOptionCoefInputProps
 * @extends {InputHTMLAttributes<HTMLInputElement>}
 * @property {string} [ariaLabel] - Label ARIA pour l'accessibilité de l'input.
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 * @property {function(number): void} [onChangeValue] - Fonction de rappel lors du changement de valeur.
 */
export type UICounterInputProps = {
    ariaLabel?: string,
    inputRef?: RefObject<HTMLInputElement>;
    onChangeValue?: (value: number) => void;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * Composant pour un champ de saisie de type number avec un pas de 0.01.
 *
 * @param {UIOptionCoefInputProps} props - Propriétés pour configurer l'input de counter.
 * @returns {JSX.Element} Un champ de saisie de type number.
 */
const UICounterInput = ({ inputRef, onChangeValue, ...rest }: UICounterInputProps) => {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        setValue(newValue);
        if (onChangeValue) {
            onChangeValue(newValue);
        }
    };

    return (
        <input 
            type="number"
            step="0.01"
            className={`UICounterInput ${rest.className || ''}`}
            ref={inputRef}
            value={value}
            onChange={(event) => handleChange(event)}
            aria-label={rest.ariaLabel}
            {...rest}
        />
    );
};

export default UICounterInput;
