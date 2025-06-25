
import { ConnectedAdmin, GuildConfig } from "@/types";

/**
 * Effectue une requête UPDATE vers l'endpoint "/api/guildConfig/update" avec les données fournies.
 * @param {FormData} formData - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */
const updateGuildConfig = async (admin: ConnectedAdmin, objectTofetch: GuildConfig): Promise<Response | Error> => {
    try {
      const response = await fetch("/api/guildConfig/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${admin.token}`,
          'X-Auth-Email': `${admin.mail}`
        },
        body: JSON.stringify(objectTofetch),
      });  
      if (!response.ok) {
        throw new Error(`updateGuildConfig ~> Request failed with status ${response.status} : ${response.body}`);
      }  
      return response;
    } catch (error) {
      console.log("updateGuildConfig ~> Error:", error);
      return error as Error;
    }
  };
  
  export default updateGuildConfig;