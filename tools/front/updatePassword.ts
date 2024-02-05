import { PasswordUpdateRequest } from "@/components/PasswordUpdater";

/**
 * Effectue une requête UPDATE vers l'endpoint "/api/password/update" avec les données fournies.
 * @param {FormData} formData - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */
const updatePassword = async (objectTofetch: PasswordUpdateRequest): Promise<Response | Error> => {
    try {
      const response = await fetch("/api/password/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${objectTofetch.user?.token}`
        },
        body: JSON.stringify(objectTofetch),
      });  
      if (!response.ok) {
        throw new Error(`updatePassword ~> Request failed with status ${response.status} : ${response.body}`);
      }  
      return response;
    } catch (error) {
      console.log("updatePassword ~> Error:", error);
      return error as Error;
    }
  };
  
  export default updatePassword;