import { ConnectedAdmin } from "@/types";

/**
 * Effectue une requête POST vers l'endpoint "/api/user/login" avec les données fournies.
 * @param {Object} objectToFetch - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
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