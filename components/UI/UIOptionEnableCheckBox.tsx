import React, { useState, RefObject, InputHTMLAttributes } from 'react';

/**
 * Propriétés pour le composant UIOptionEnableCheckbox.
 * @typedef {Object} UIOptionEnableCheckboxProps
 * @extends {InputHTMLAttributes<HTMLInputElement>}
 * @property {RefObject<HTMLInputElement>} [inputRef] - Référence de l'objet input pour accès direct.
 * @property {function(boolean): void} [onChangeStatus] - Fonction de rappel lors du changement de statut.
 */
export type UIOptionEnableCheckboxProps = {
    inputRef?: RefObject<HTMLInputElement>;
    onChangeStatus?: (isActive: boolean) => void;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * Composant pour une checkbox indiquant si une option est active ou inactive.
 *
 * @param {UIOptionEnableCheckboxProps} props - Propriétés pour configurer la checkbox.
 * @returns {JSX.Element} Une checkbox avec indication "actif" ou "inactif".
 */
const UIOptionEnableCheckbox = ({ inputRef, onChangeStatus, ...rest }: UIOptionEnableCheckboxProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        if (onChangeStatus) {
            onChangeStatus(event.target.checked);
        }
    };

    return (
        <div 
            className={`UIOptionEnableCheckbox ${rest.className}`}
            style={{display: "flex", gap: "5px"}}>
            <input 
                type="checkbox"
                ref={inputRef}
                checked={isChecked}
                onChange={handleChange}
                {...rest}
            />
            <span>{isChecked ? 'oui' : 'non'}</span>
        </div>
    );
};

export default UIOptionEnableCheckbox;
