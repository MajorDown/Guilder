import { GuildConfig } from "@/types";
import ConfigCard from "./ConfigCard";

export type ConfigListerProps = {
    config: GuildConfig | undefined;
}

const ConfigLister = (props: ConfigListerProps) => {
  if (props.config) return (
    <ul id="configLister">
        {props.config.config.map((option, index) => (
            <ConfigCard key={index} option={option}/>
        ))}
    </ul>
  )
}

export default ConfigLister;