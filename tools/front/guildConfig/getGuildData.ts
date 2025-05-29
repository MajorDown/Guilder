import { ConnectedManager } from "@/types";

type GetGuildDataInput = {
    manager: ConnectedManager;
    guildName: string;
}

/**
 * @description Récupère les noms de toutes les guildes
 * @param manager - Le manager connecté
 * @returns 
 */
const getGuildData = async (input:GetGuildDataInput): Promise<string[]> => {
    const response = await fetch(`/api/gestion/guildData/${input.guildName}`, {
        method: 'GET',
        headers: {
            'X-Manager-Email': input.manager.mail,
            'Authorization': `Bearer ${input.manager.token}`
        }
    })
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch guild data");
    }
    const data = await response.json();
    // si le tableau n'est pas vide, il faut trier par ordre alphabétique
    if (data.length > 0) data.sort((a: string, b: string) => a.localeCompare(b));
    return data as string[];
}

export default getGuildData;