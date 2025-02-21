import { ConnectedAdmin, GuildRules } from "@/types";

const updateGuildRules = async (rules: GuildRules, admin: ConnectedAdmin): Promise<Response | Error> => {
    try {
        const response = await fetch("/api/guildRules/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${admin.token}`,
            'X-Auth-Email': `${admin.mail}`
          },
          body: JSON.stringify(rules),
        });  
        if (!response.ok) {
          throw new Error(`updateGuildRules ~> Request failed with status ${response.status} : ${response.body}`);
        }  
        return response;
      } catch (error) {
        console.log("updateGuildRules ~> Error:", error);
        return error as Error;
      }
}

export default updateGuildRules;