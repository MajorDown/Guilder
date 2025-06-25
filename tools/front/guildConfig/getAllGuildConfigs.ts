import { ConnectedManager, GuildConfig } from "@/types";

/**
 * @description Récupère toutes les configurations de guildes
 * @param ConnectedManager manager - Le manager connecté
 * @returns guildConfig[]
 */
const getAllGuildConfigs = async (manager: ConnectedManager): Promise<GuildConfig[]> => {
    const response = await fetch("/api/gestion/guildConfig/getAll", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "X-Manager-Email": manager.mail,
        Authorization: `Bearer ${manager.token}`,
        },
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch guildconfigs");
    }
    
    const data = await response.json();
    return data as GuildConfig[];
}

export default getAllGuildConfigs;