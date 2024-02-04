import { ConnectedAdmin, GuildConfig } from "@/types";
import ConfigCard from "./ConfigCard";
import updateGuildConfig from "@/tools/front/updateGuildConfig";
import { useState } from "react";

export type ConfigListerProps = {
    config: GuildConfig | undefined;
    admin: ConnectedAdmin
}

/**
 * @module ConfigLister
 * 
 * Permet de lister les options de la config de la guilde et de gérer leur modification.
 */
const ConfigLister = (props: ConfigListerProps) => {
  const [guildConfig, setGuildConfig] = useState<GuildConfig | undefined>(props.config);
  const [updateError, setUpdateError] = useState<string>("");

  const handleChangeEnabled = async (value: boolean, optionName: string) => {
    let newConfig = props.config;
    newConfig?.config.map((option) => {
      if (option.option === optionName) {
        option.enabled = value;
      }
    })
    const response = await updateGuildConfig(props.admin, newConfig as GuildConfig);
    if (response instanceof Response) {
      const newData = await response.json();
      if(newData) {
          setGuildConfig(newData);
      }
    }
    else {
      setUpdateError("un problême est survenu lors de l'actualisation des options'. Veuillez réessayer plus tard.");
      setTimeout(() => setUpdateError(""), 5000);
  }}

  const handleDeleteOption = async (optionName: string) => {
    if (!window.confirm("Etes-vous sûr de vouloir supprimer cette option ?")) return;
    let newConfig = props.config;
    newConfig?.config.map((option) => {
      if (option.option === optionName) {
        //supprimer l'option du tableau config
        newConfig?.config.splice(newConfig?.config.indexOf(option), 1);
      }
    })
    const response = await updateGuildConfig(props.admin, newConfig as GuildConfig);
    if (response instanceof Response) {
      const newData = await response.json();
      if(newData) {
          setGuildConfig(newData);
      }
    }
    else {
      setUpdateError("un problême est survenu lors de l'actualisation des options'. Veuillez réessayer plus tard.");
      setTimeout(() => setUpdateError(""), 5000);
    }
  }

  if (props.config) return (
    <ul id="configLister">
        {props.config.config.map((option, index) => (
            <ConfigCard 
                key={index} 
                option={option}
                onChangeEnabled={(value) => handleChangeEnabled(value, option.option)}
                onDelete={(optionName) => handleDeleteOption(optionName)}
                />
        ))}
        {updateError && <p style={{color: "red"}}>{updateError}</p>}
    </ul>
  )
}

export default ConfigLister;