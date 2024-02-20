import { ConnectedAdmin, Contestation } from "@/types";

/**
 * Effectue une requête UPDATE vers l'endpoint "/api/interventions/update" avec les données fournies.
 * @param {FormData} formData - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */
const updateGuildConfig = async (admin: ConnectedAdmin, updatedContestation: Contestation): Promise<Contestation | null> => {
    try {
      const response = await fetch("/api/interventions/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${admin.token}`,
          'X-admin-Email': `${admin.mail}`
        },
        body: JSON.stringify(updatedContestation),
      });  
      if (!response.ok) {
        throw new Error(`updateIntervention ~> Request failed with status ${response.status} : ${response.body}`);
      }
      return await response.json() as Contestation;
    } catch (error) {
      console.log("updateIntervention ~> Error:", error);
      return null;
    }
  };
  
  export default updateGuildConfig;