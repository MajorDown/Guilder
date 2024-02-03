import { GuildConfig } from "@/types";
import ConfigCard from "./ConfigCard";

export type ConfigListerProps = {
    config: GuildConfig | undefined;
}

const ConfigLister = (props: ConfigListerProps) => {
  
  const handleChangeEnabled = (value: boolean) => {
    console.log("changing", value);
  }

  const handleDeleteOption = () => {
    console.log("deleting option");
  }

  if (props.config) return (
    <ul id="configLister">
        {props.config.config.map((option, index) => (
            <ConfigCard 
                key={index} 
                option={option}
                onChangeEnabled={(value) => handleChangeEnabled(value)}
                onDelete={() => handleDeleteOption()}/>
        ))}
    </ul>
  )
}

export default ConfigLister;