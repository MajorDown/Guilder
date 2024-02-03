import Image from "next/image";
import UIButton from "./UI/UIButton";
import UISwitch from "./UI/UISwitch";

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
                alignItems: "center",
                border: "solid 3px var(--font-color-1)",
                borderRadius: "var(--border-radius-absolute)",
            }}
        >
            <p style={{width: "60%"}}>{props.option.option}</p>
            <p style= {{width: "20%", textAlign: "center"}}>{props.option.coef}</p>
            <UISwitch options={["actif", "inactif"]} value={props.option.enabled} onChange={() => handleChangeEnabled()} minWidth="100px"/>
            <UIButton style={{minWidth: "50px"}} onClick={() => handleDeleteOption()}>
                <Image src="/images/trash.svg" alt="supprimer" width={24} height={24}/>
            </UIButton>
        </li>
  )
}

export default ConfigCard;