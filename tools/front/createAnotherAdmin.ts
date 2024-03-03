import { ConnectedAdmin } from "@/types";

/**
 * Effectue une requête POST vers l'endpoint "/api/admin/add" avec les données fournies.
 * @param {FormData} formData - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */
const createAnotherAdmin = async (objectTofetch: Object, admin: ConnectedAdmin): Promise<Response | Error> => {
    try {
      const response = await fetch("/api/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${admin.token}`,
          "X-admin-Mail": admin.mail,
        },
        body: JSON.stringify(objectTofetch),
      });
  
      if (!response.ok) {
        throw new Error(`createAnotherAdmin ~> Request failed with status ${response.status} : ${response.body}`);
      }
  
      return response;
    } catch (error) {
      console.log("createAnotherAdmin ~> Error:", error);
      return error as Error;
    }
  };
  
  export default createAnotherAdmin;