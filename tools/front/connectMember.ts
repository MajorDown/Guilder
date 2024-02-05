import { ConnectedMember } from "@/types";

/**
 * Effectue une requête POST vers l'endpoint "/api/user/login" avec les données fournies.
 * @param {Object} objectToFetch - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
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