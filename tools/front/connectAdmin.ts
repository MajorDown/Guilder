import { ConnectedAdmin } from "@/types";

/**
 * Connecte un administrateur à son compte
 * 
 * @param {Object} objectToFetch
 * @returns {Promise<ConnectedAdmin | Error>}
 */
const connectAdmin = async (objectToFetch: Object): Promise<ConnectedAdmin | Error> => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectToFetch),
      });
  
      if (!response.ok) {
        throw new Error(`connectAdmin ~> Request failed with status ${response.status} : ${response.body}`);
      }
      const connectedAdmin: ConnectedAdmin = await response.json();
      return connectedAdmin;
    } catch (error) {
      console.log("connectAdmin ~> Error:", error);
      return error as Error;
    }
  };
  
  export default connectAdmin;