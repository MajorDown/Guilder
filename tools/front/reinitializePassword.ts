/**
 * Effectue une requête UPDATE vers l'endpoint "/api/password/reinitialize" avec les données fournies.
 * @param {FormData} Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec Error en cas d'échec.
 */

const reinitializePassword = async (objectTofetch: {mail: string, type: string}): Promise<Response | Error> => {
    try {
      const response = await fetch("/api/password/reinitialize", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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
  
  export default reinitializePassword;