import { useEffect } from "react";
import getGuildData from "@/tools/front/guildConfig/getGuildData";
import Style from "@/styles/components/manager/guildDataViewer.module.css";
import {useManagerContext } from "@/contexts/managerContext";
import { ConnectedManager } from "@/types";

export type GuildDataViewerProps = {
    guildName: string
}

const GuildDataViewer = (props: GuildDataViewerProps): JSX.Element => {
    const { manager } = useManagerContext();

    const fetchGuildData = async () => {
        try {
            const data = await getGuildData({ manager: manager as ConnectedManager, guildName: props.guildName });
            console.log("Guild Data:", data);
        } catch (error) {
            console.error("Failed to fetch guild data:", error);
        }
    };

    useEffect(() => {
        fetchGuildData();
    }, [props.guildName])

    return (
        <div className={Style.guildDataViewer}>
            <h3>Données de la guilde {props.guildName}</h3>
        </div>
    );
}

export default GuildDataViewer;