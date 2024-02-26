import { ConnectedMember } from "@/types";

/**
 * Connecte un membre à son compte
 * 
 * @param {Object} objectToFetch
 * @returns {Promise<ConnectedMember | Error>}
 */
const connectMember = async (objectToFetch: Object): Promise<ConnectedMember | Error> => {
    try {
      const response = await fetch("/api/member/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectToFetch),
      });
  
      if (!response.ok) {
        throw new Error(`connectMember ~> Request failed with status ${response.status} : ${response.body}`);
      }
      const connectedMember: ConnectedMember = await response.json();
      return connectedMember;
    } catch (error) {
      console.log("connectMember ~> Error:", error);
      return error as Error;
    }
  };
  
  export default connectMember;