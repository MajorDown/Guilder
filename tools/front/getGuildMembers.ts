import { ConnectedAdmin, ConnectedMember, MembersList, UserName } from "@/types";

/**
 * récupère une liste des membres de sa guilde.
 * 
 * @param {ConnectedAdmin | ConnectedMember} user - L'objet contenant les informations de connexion.
 **/
export const getGuildMembers = async (user: ConnectedAdmin | ConnectedMember): Promise<MembersList | null> => {
  try {
    const response = await fetch(`/api/guild/${user.guild}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
        'X-user-Email': user.mail,
        'X-role': user.hasOwnProperty('counter') ? 'member' : 'admin',
      }
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