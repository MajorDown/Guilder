import { ConnectedAdmin, UserMail } from "@/types";

const deleteMember = async (memberMail: UserMail, admin: ConnectedAdmin): Promise<Response | Error> => {
    try {
        // Ajoutez memberMail comme paramètre dans l'URL
        const url = `/api/member/delete/${encodeURIComponent(memberMail)}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${admin.token}`,
                "X-admin-Mail": `${admin.mail}`,
            },
        })  
        if (!response.ok) {
            throw new Error(`deleteMember ~> Request failed with status ${response.status} : ${response.statusText}`);
        }  
        return response;
    } catch (error) {
        console.error("deleteMember ~> Error:", error);
        return error as Error;
    }
};

export default deleteMember;