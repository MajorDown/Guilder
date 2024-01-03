import { ConnectedUser } from "@/types";

const getUserOperations = async (user: ConnectedUser): Promise<Response | unknown> => {
  try {
    const response = await fetch(`/api/operation/get?user=${encodeURIComponent(user.name)}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });  
    if (!response.ok) {
      throw new Error(`getUserOperations ~> Request failed with status ${response.status} : ${response.body}`);
    }  
    return response.json();
  } catch (error) {
    console.error("Error searching operation:", error);
    return error;
  }
};

export default getUserOperations;
