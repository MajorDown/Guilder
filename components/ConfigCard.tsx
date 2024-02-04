import Image from "next/image";
import UIButton from "./UI/UIButton";
import UISwitch from "./UI/UISwitch";

export type ConfigCardProps = {
    option: {
        option: string;
        coef: number;
        enabled: boolean;
    }
    onChangeEnabled: (value: boolean, optionName: string) => void;
    onDelete: (optionName: string) => void;
}

/**
 * @module ConfigCard
 * 
 * Permet d'afficher une option de la config de la guilde ainsi que les options de modification.
 */
const ConfigCard = (props: ConfigCardProps) => {   
    return (
        <li 
            className="configCard"
            style={{
                width: "600px",
                display: "flex",
                alignItems: "center",
                border: "solid 3px var(--font-color-1)",
                borderRadius: "var(--border-radius-absolute)",
            }}
        >
            <p style={{width: "60%"}}>{props.option.option}</p>
            <p style= {{width: "20%", textAlign: "center"}}>{props.option.coef}</p>
            <UISwitch 
                minWidth="80px"
                options={["actif", "inactif"]} 
                value={props.option.enabled} 
                onChange={(value) => props.onChangeEnabled(value, props.option.option)} 
            />
            <UIButton style={{minWidth: "50px", marginLeft: "5px"}} onClick={() => props.onDelete(props.option.option)}>
                <Image src="/images/trash.svg" alt="supprimer" width={24} height={24}/>
            </UIButton>
        </li>
  )
}

export default ConfigCard;