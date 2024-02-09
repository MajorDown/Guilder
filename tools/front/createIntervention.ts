import { Operation } from "@/types";

const createOperation = async (operation: Operation, authToken: string): Promise<Response | undefined | unknown> => {
    try {
      const response = await fetch("/api/operation/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(operation),
      });  
      if (!response.ok) {
        throw new Error(`createOperation ~> Request failed with status ${response.status} : ${response.body}`);
      }  
      return response;
    } catch (error) {
      console.error("Error submitting operation:", error);
      return error;
    }
  };

export default createOperation;