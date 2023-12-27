import { Guild } from "@/types";

/**
 * Récupère les membres d'une guilde à partir du serveur API.
 *
 * @param {Guild} guild - L'objet représentant la guilde pour laquelle récupérer les membres.
 * @returns {Promise<Response|Error>} Une promesse qui résout avec la réponse de l'API ou une erreur en cas d'échec.
 *   - Si la promesse résout avec une réponse, elle peut contenir les données des membres de la guilde.
 *   - Si la promesse est rejetée, elle contient une erreur indiquant la raison de l'échec.
 */
export const getGuildMembers = async (guild: Guild): Promise<Response | Error> => {
    const token = localStorage.getItem("guilder_token");
    const response: Response | Error = await fetch(`/api/guild/${guild}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
    return response;
}