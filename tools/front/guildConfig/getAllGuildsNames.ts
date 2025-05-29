import { ConnectedManager } from "@/types";

/**
 * @description Récupère les noms de toutes les guildes
 * @param manager - Le manager connecté
 * @returns 
 */
const getAllGuildsNames = async (manager: ConnectedManager): Promise<string[]> => {
    const response = await fetch('/api/gestion/guildsName/getAll', {
        method: 'GET',
        headers: {
            'X-Manager-Email': manager.mail,
            'Authorization': `Bearer ${manager.token}`
        }
    })
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch guilds names");
    }
    const data = await response.json();
    // si le tableau n'est pas vide, il faut trier par ordre alphabétique
    if (data.length > 0) data.sort((a: string, b: string) => a.localeCompare(b));
    return data as string[];
}

export default getAllGuildsNames;