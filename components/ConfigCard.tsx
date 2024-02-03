import Image from "next/image";
import UIButton from "./UI/UIButton";
import UISwitch from "./UI/UISwitch";

export type ConfigCardProps = {
    key: number;
    option: {
        option: string;
        coef: number;
        enabled: boolean;
    }
    onChangeEnabled: (value: boolean) => void;
    onDelete: () => void;
}

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
                onChange={(value) => props.onChangeEnabled(value)} 
            />
            <UIButton style={{minWidth: "50px", marginLeft: "5px"}} onClick={() => props.onDelete()}>
                <Image src="/images/trash.svg" alt="supprimer" width={24} height={24}/>
            </UIButton>
        </li>
  )
}

export default ConfigCard;