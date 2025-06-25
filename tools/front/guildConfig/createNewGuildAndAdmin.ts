import { ConnectedManager } from "@/types";

export type CreateNewGuildAndAdminInput = {
    manager: ConnectedManager
    newGuild: {
        name: string;
        phone: string;
        mail: string;
        adress: {
            line1: string;
            line2?: string;
            code: string;
            city: string;
        }
        packageId: 0 | 1 | 2 | 3 | 4;
    };
    newAdmin: {
        firstName: string;
        lastName: string;
        mail: string;
        phone: string;
    };
}

/**
 * @description Crée une nouvelle guilde et un nouvel admin
 * @param input - Les informations nécessaires pour créer une nouvelle guilde et un nouvel administrateur
 * @returns Promise<Boolean> - Retourne true si la création est réussie, sinon lève une erreur
 */
const createNewGuildAndAdmin = async (input: CreateNewGuildAndAdminInput): Promise<Boolean> => {
    const response = await fetch("/api/gestion/guildConfig/createNewGuildAndAdmin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Manager-Email": input.manager.mail,
            Authorization: `Bearer ${input.manager.token}`,
        },
        body: JSON.stringify({
            newGuild: input.newGuild,
            newAdmin: input.newAdmin
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create new guild and admin");
    }
    return true;
}

export default createNewGuildAndAdmin;