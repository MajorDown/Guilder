/**
 * Effectue une requête POST vers l'endpoint "/api/admin/signup" avec les données fournies.
 * @param {FormData} formData - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */
const createAdmin = async (objectTofetch: Object): Promise<Response | Error> => {
    try {
      const response = await fetch("/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectTofetch),
      });
  
      if (!response.ok) {
        throw new Error(`createAdmin ~> Request failed with status ${response.status} : ${response.body}`);
      }
  
      return response;
    } catch (error) {
      console.log("createAdmin ~> Error:", error);
      return error as Error;
    }
  };
  
  export default createAdmin;