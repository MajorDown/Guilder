/**
 * Effectue une requête POST vers l'endpoint "/api/operation" avec les données fournies.
 * @param {FormData} formData - Les données du formulaire à envoyer.
 * @returns {Promise<Response>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */
const createOperation = async (formData: FormData): Promise<Response | undefined | unknown> => {
    try {
      const response = await fetch("/api/operation", {
        method: "POST",
        body: formData,
      });  
      if (!response.ok) {
        throw new Error(`createOperation ~> Request failed with status ${response.status} : ${response.body}`);
      }  
      return response;
    } catch (error) {
      console.error("Error submitting operation:", error);
      return error;
    }
  };

export default createOperation;