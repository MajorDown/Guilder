import { ConnectedMember, Contestation } from "@/types";

const getMemberContestations = async (member: ConnectedMember): Promise<Contestation[] | undefined> => {
  try {
    const response = await fetch(`/api/contestation/get?member=${encodeURIComponent(member.name)}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${member.token}`,
        'X-user-Mail': member.mail,
      },
    });  
    if (!response.ok) {
      throw new Error(`getMemberContestations ~> Request failed with status ${response.status} : ${response.body}`);
    }  
    return response.json();
  } catch (error) {
    console.error("Error searching Contestations:", error);
    return undefined;
  }
};

export default getMemberContestations;