import Image from "next/image";
import UIButton from "./UI/UIButton";

export type ConfigCardProps = {
    option: {
        option: string;
        coef: number;
        enabled: boolean;
    }
}

const ConfigCard = (props: ConfigCardProps) => {

    const handleChangeEnabled = () => {
        console.log("change enabled");
    }

    const handleDeleteOption = () => {
        console.log("modifier")
    }
    
    return (
        <li 
            className="configCard"
            style={{
                width: "600px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: props.option.enabled ? "var(--color-1)" : "var(--color-2)"
            }}
        >
            <p style={{width: "60%"}}>{props.option.option}</p>
            <p style= {{width: "20%"}}>{props.option.coef}</p>
            <UIButton style={{width: "10%"}} onClick={() => handleChangeEnabled()}>
                {props.option.enabled ? "activer" : "Désactiver"}
            </UIButton>
            <UIButton style={{width: "10%"}} onClick={() => handleDeleteOption()}>
                <Image src="/images/trash.svg" alt="supprimer" width={24} height={24}/>
            </UIButton>
        </li>
  )
}

export default ConfigCard;