import Image from "next/image";
import UIButton from "./UI/UIButton";
import UISwitch from "./UI/UISwitch";
import { useState } from "react";

export type ConfigCardProps = {
    option: {
        option: string;
        coef: number;
        enabled: boolean;
    }
    onChangeEnabled: (value: boolean, optionName: string) => void;
    onChangeOptionData: (optionData: {name: string, coef: number}) => void;
    onDelete: (optionName: string) => void;
}

/**
 * @module ConfigCard
 * 
 * Permet d'afficher une option de la config de la guilde ainsi que les options de modification.
 */
const ConfigCard = (props: ConfigCardProps) => { 
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [actualOptionName, setActualOptionName] = useState<string>(props.option.option);
    const [actualOptionCoef, setActualOptionCoef] = useState<number>(props.option.coef);

    const handleValidChanges = () => {
        props.onChangeOptionData({name: actualOptionName, coef: actualOptionCoef});
        setIsOpen(false);
    }

    return (
        <li className="configCard" >
            {isOpen && <UIButton style={{minWidth: "50px", marginLeft: "5px"}} onClick={() => handleValidChanges()}>
                <Image src="/images/icons/valid-green.svg" alt="valider" width={24} height={24}/>
            </UIButton>}
            {!isOpen && <UIButton style={{minWidth: "50px", marginLeft: "5px"}} onClick={() => setIsOpen(true)}>
                <Image src="/images/icons/update-green.svg" alt="modifier" width={24} height={24}/>
            </UIButton>}
            {!isOpen && <>
                <p style={{width: "40%", paddingLeft: "5px"}}>{props.option.option}</p>
                <p style= {{width: "40%", textAlign: "center"}}>{props.option.coef}</p>
            </>}
            {isOpen && <>
                <input 
                    style={{width: "40%", paddingLeft: "5px"}}
                    type="text" 
                    value={actualOptionName} 
                    onChange={(e) => setActualOptionName(e.target.value)}
                />
                <input 
                    style= {{width: "15%", marginRight: "5px", textAlign: "center"}} 
                    type="number" 
                    value={actualOptionCoef} 
                    onChange={(e) => setActualOptionCoef(Number(e.target.value))}
                />
            </>}
            <UISwitch 
                minWidth="80px"
                options={["actif", "inactif"]} 
                value={props.option.enabled} 
                onChange={(value) => props.onChangeEnabled(value, props.option.option)} 
            />
            <UIButton style={{minWidth: "50px", marginLeft: "5px"}} onClick={() => props.onDelete(props.option.option)}>
                <Image src="/images/icons/trash-green.svg" alt="supprimer" width={24} height={24}/>
            </UIButton>
        </li>
    )
}

export default ConfigCard;