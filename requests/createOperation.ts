const createOperation = async (formData: FormData): Promise<Response | undefined | unknown> => {
    try {
      const response = await fetch("/api/operation", {
        method: "POST",
        body: formData,
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