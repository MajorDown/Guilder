import { ConnectedUser } from "@/types";

/**
 * Effectue une requête POST vers l'endpoint "/api/user/login" avec les données fournies.
 * @param {Object} objectToFetch - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */
const connectUser = async (objectToFetch: Object): Promise<ConnectedUser | Error> => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectToFetch),
      });
  
      if (!response.ok) {
        throw new Error(`connectUser ~> Request failed with status ${response.status} : ${response.body}`);
      }
      const connectedUser: ConnectedUser = await response.json();
      return connectedUser;
    } catch (error) {
      console.log("connectUser ~> Error:", error);
      return error as Error;
    }
  };
  
  export default connectUser;