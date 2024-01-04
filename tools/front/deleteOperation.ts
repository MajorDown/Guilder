import { ConnectedUser } from "@/types";

const deleteOperation = async (declarationDate: string, user: ConnectedUser): Promise<Response | unknown> => {
    try {
        const response = await fetch(`/api/operation/delete?date=${encodeURIComponent(declarationDate)}&user=${encodeURIComponent(user.name)}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response;
    } 
    catch (error) {
        console.error("Error deleting operation:", error);
        return error;
    }
};

export default deleteOperation;