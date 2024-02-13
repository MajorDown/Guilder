import { ConnectedMember, ConnectedAdmin } from "@/types";

const getMemberInterventiontions = async (user: ConnectedMember | ConnectedAdmin, numberOfInterventions?: number): Promise<Response | unknown> => {
  try {
    const response = await fetch(`/api/interventions/get?user=${encodeURIComponent(user.name)}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'X-user-Mail': user.mail,
        'X-user-Role': user.hasOwnProperty('counter') ? 'member' : 'admin',
        'X-number-Of-Interventions': numberOfInterventions ? numberOfInterventions.toString() : ''
      },
    });  
    if (!response.ok) {
      throw new Error(`getMemberInterventions ~> Request failed with status ${response.status} : ${response.body}`);
    }  
    return response.json();
  } catch (error) {
    console.error("Error searching operation:", error);
    return error;
  }
};

export default getMemberInterventiontions;
