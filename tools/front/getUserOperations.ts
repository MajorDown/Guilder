import { ConnectedUser } from "@/types";

const getUserOperations = async (user: ConnectedUser): Promise<Response | undefined | unknown> => {
    try {
        const response = await fetch("/api/operation/get", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(user.name),
        });  
        if (!response.ok) {
          throw new Error(`getUserOperations ~> Request failed with status ${response.status} : ${response.body}`);
        }  
        return response;
      } catch (error) {
        console.error("Error searching operation:", error);
        return error;
      }
};

export default getUserOperations;