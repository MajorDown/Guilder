import { ConnectedAdmin, Contestation } from "@/types";

/**
 * Effectue une requête DELETE vers l'endpoint "/api/interventions/delete/".
 * @param {ConnectedAdmin} admin - Les informations de l'administrateur connecté.
 * @param {string} interventionDate - La date de l'intervention à supprimer.
 * @returns {Promise<Response | null>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec null en cas d'échec.
 */
const deleteIntervention = async (admin: ConnectedAdmin, contestation: Contestation): Promise<Response | null> => {
    try {
      const response = await fetch(`/api/interventions/delete/`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${admin.token}`,
          'X-admin-Email': `${admin.mail}`,
          'X-contestation': `${contestation.contestationDate}`
        },
      });
      if (!response.ok) {
        throw new Error(`deleteIntervention ~> Request failed with status ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error("deleteIntervention ~> Error:", error);
      return null;
    }
};

export default deleteIntervention;
