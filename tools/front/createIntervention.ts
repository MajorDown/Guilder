import { ConnectedMember, Intervention, UserCounter } from "@/types";

/**
 * Crée une intervention
 * 
 * @param {Intervention} intervention
 * @param {ConnectedMember} member
 * @returns {Promise<UserCounter | undefined>}
 */
const createIntervention = async (intervention: Intervention, member: ConnectedMember): Promise<UserCounter | undefined> => {
    try {
      const response = await fetch("/api/interventions/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${member.token}`,
          'X-user-Email': member.mail,
          'X-user-Guild': member.guild
        },
        body: JSON.stringify(intervention),
      });  
      if (!response.ok) {
        throw new Error(`createIntervention ~> Request failed with status ${response.status} : ${response.body}`);
      }  
      const data: UserCounter = await response.json();
      return data;
    } catch (error) {
      console.error("Error submitting operation:", error);
      return undefined;
    }
  };

export default createIntervention;