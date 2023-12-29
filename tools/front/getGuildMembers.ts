import { Guild, MembersList } from "@/types";

/**
 * fonction communiquant avec l'API du serveur pour récupérer une liste des membres
 * de sa guilde. Elle utilise un token d'authentification pour
 * s'assurer que la requête est autorisée.
 *
 * @param {Guild} guildName - Le nom de la guilde pour laquelle récupérer les membres.
 * @param {string} authToken - Le token d'authentification pour la requête API.
 * @returns {Promise<MembersList | []>} Une promesse qui résout en une liste des membres
 * de la guilde si la requête réussit, ou un tableau vide en cas d'échec.
 */
export const getGuildMembers = async (guildName: Guild, authToken: string): Promise<MembersList | []> => {
  try {
    const response = await fetch(`/api/guild/${guildName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Vous pouvez également traiter différentes réponses du serveur ici
      throw new Error(`Erreur côté serveur: ${response.status}`);
    }

    const membersList: MembersList = await response.json();
    return membersList;
  } catch (error) {
    console.error(error);
    return [];
  }
}