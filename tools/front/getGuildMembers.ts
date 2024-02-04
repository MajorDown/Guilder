import { ConnectedAdmin, MembersList } from "@/types";

/**
 * fonction communiquant avec l'API du serveur pour récupérer une liste des membres
 * de sa guilde.
 * 
 * @param {ConnectedAdmin} admin - L'objet contenant les informations de connexion.
 **/
export const getGuildMembers = async (admin: ConnectedAdmin): Promise<MembersList | null> => {
  try {
    const response = await fetch(`/api/guild/${admin.guild}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${admin.token}`,
        'X-Admin-Email': admin.mail
      },
    });
    if (!response.ok) {
      throw new Error(`Erreur côté serveur: ${response.status}`);
    }
    if (response.status === 204) {
      return null;
    }
    const membersList: MembersList = await response.json();
    return membersList;
  } catch (error) {
    console.error(error);
    return null;
  }
}