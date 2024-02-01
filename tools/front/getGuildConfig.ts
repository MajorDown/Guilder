import { GuildConfig, Guild, ConnectedAdmin } from "@/types";

const getGuildConfig = async (admin: ConnectedAdmin): Promise<Response | unknown> => {
  try {
    const response = await fetch(`/api/guildConfig/get?guildName=${encodeURIComponent(admin.guild)}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${admin.token}`
      }
    });  
    if (!response.ok) {
      throw new Error(`getGuildConfig ~> Request failed with status ${response.status} : ${response.body}`);
    }  
    return response.json();
  } catch (error) {
    console.error("Error searching guildConfig:", error);
    return error;
  }
};

export default getGuildConfig;