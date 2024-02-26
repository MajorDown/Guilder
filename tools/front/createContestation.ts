import { ConnectedMember, Contestation } from "@/types";

/**
 * Crée une intervention
 * 
 * @param {Contestation} contestation
 * @param {ConnectedMember} member
 * @returns {Promise<Contestation | undefined>}
 */
const createIntervention = async (contestation: Contestation, member: ConnectedMember): Promise<Contestation | undefined> => {
    try {
      const response = await fetch("/api/contestation/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${member.token}`,
          'X-user-Email': member.mail,
        },
        body: JSON.stringify(contestation),
      });  
      if (!response.ok) {
        throw new Error(`createContestation ~> Request failed with status ${response.status} : ${response.body}`);
      }  
      const data: Contestation = await response.json();
      return data;
    } catch (error) {
      console.error("Error submitting operation:", error);
      return undefined;
    }
  };

export default createIntervention;