import { ConnectedAdmin, NewMemberInfos } from "@/types";

/**
 * Effectue une requête POST vers l'endpoint "/api/member/signup" avec les données fournies.
 * @param {FormData} formData - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */
const createMember = async (objectTofetch: NewMemberInfos, admin: ConnectedAdmin): Promise<Response | Error> => {
  try {
    const response = await fetch("/api/member/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${admin.token}`,
        'X-Auth-Email': admin.mail,
      },
      body: JSON.stringify(objectTofetch),
    });

    if (!response.ok) {
      throw new Error(`createMember ~> Request failed with status ${response.status} : ${response.body}`);
    }

    return response;
  } catch (error) {
    console.log("createMember ~> Error:", error);
    return error as Error;
  }
};

export default createMember;