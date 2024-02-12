import { ConnectedAdmin, ConnectedMember } from "@/types";

const getGuildConfig = async (user: ConnectedAdmin | ConnectedMember): Promise<Response | unknown> => {
  try {
    const response = await fetch(`/api/guildConfig/get?guildName=${encodeURIComponent(user.guild)}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'X-user-Mail': user.mail,
        'X-user-Role': user.hasOwnProperty('counter') ? 'member' : 'admin'},
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