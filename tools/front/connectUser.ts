/**
 * Effectue une requête POST vers l'endpoint "/api/user/login" avec les données fournies.
 * @param {Object} objectToFetch - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */

import { Guild, UserCounter, UserMail, UserName, UserPhone } from "@/types";

export type ConnectedUserType = {
  token: string;
  mail: UserMail,
  name: UserName,
  phone: UserPhone,
  counter: UserCounter,
  guild: Guild
}

const connectUser = async (objectToFetch: Object): Promise<ConnectedUserType | Error> => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectToFetch),
      });
  
      if (!response.ok) {
        throw new Error(`connectUser ~> Request failed with status ${response.status} : ${response.body}`);
      }
      const connectedUser: ConnectedUserType = await response.json();
      return connectedUser;
    } catch (error) {
      console.log("connectUser ~> Error:", error);
      return error as Error;
    }
  };
  
  export default connectUser;