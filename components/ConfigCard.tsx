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
    onEdit: (optionName: string) => void;
    onDelete: (optionName: string) => void;
}

/**
 * @module ConfigCard
 * 
 * Permet d'afficher une option de la config de la guilde ainsi que les options de modification.
 */
const ConfigCard = (props: ConfigCardProps) => {   

    const handleOnEdit = (optionName: string) => {
        console.log("clicked on edit btn: ", optionName);
        props.onEdit(optionName);
    }
    return (
        <li className="configCard" >
            {<p style={{width: "40%", paddingLeft: "5px"}}>{props.option.option}</p>}
            <p style= {{width: "40%", textAlign: "center"}}>{props.option.coef}</p>
            <UISwitch 
                minWidth="80px"
                options={["actif", "inactif"]} 
                value={props.option.enabled} 
                onChange={(value) => props.onChangeEnabled(value, props.option.option)} 
            />
            <UIButton style={{minWidth: "50px", marginLeft: "5px"}} onClick={() => handleOnEdit(props.option.option)}>
                <Image src="/images/icons/update-green.svg" alt="modifier" width={24} height={24}/>
            </UIButton>
            <UIButton style={{minWidth: "50px", marginLeft: "5px"}} onClick={() => props.onDelete(props.option.option)}>
                <Image src="/images/icons/trash-green.svg" alt="supprimer" width={24} height={24}/>
            </UIButton>
        </li>
    )
}

export default ConfigCard;