import { ConnectedMember, Intervention } from "@/types";

const createIntervention = async (intervention: Intervention, member: ConnectedMember): Promise<Response | undefined | unknown> => {
    try {
      const response = await fetch("/api/intervention/create", {
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
        throw new Error(`createOperation ~> Request failed with status ${response.status} : ${response.body}`);
      }  
      return response;
    } catch (error) {
      console.error("Error submitting operation:", error);
      return error;
    }
  };

export default createIntervention;