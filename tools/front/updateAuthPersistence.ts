import { ConnectedAdmin } from "@/types";

const updateAuthPersistence = async (admin: ConnectedAdmin, newAuthPersistence: boolean): Promise<Response | Error> => {
    try {
        const response = await fetch("/api/authPersistence/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${admin.token}`,
            'X-Auth-Email': `${admin.mail}`
          },
          body: JSON.stringify({newAuthPersistence}),
        });  
        if (!response.ok) {
        throw new Error(`updateAuthPersistence ~> Request failed with status ${response.status} : ${response.body}`);
        }  
        return response;
    } catch (error) {
    console.log("updateAuthPersistence ~> Error:", error);
        return error as Error;
    }
};

export default updateAuthPersistence;