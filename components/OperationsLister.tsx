'use client'
import { useEffect, useState } from "react";
import getUserOperations from "@/tools/front/getUserOperations";
import { useUserContext } from "@/contexts/userContext";
import { UserName, UserOperations } from "@/types";
import OperationCard from "./OperationCard";

const OperationsLister = () => {
    const {user} = useUserContext();
    const [operations, setOperations] = useState<UserOperations>();
  
    useEffect(() => {
      if(user) {
        const getOperation = async () => {
          const response = await getUserOperations(user);
          if (response)
          setOperations(response as UserOperations);
        }
        getOperation();
      }
    }, [user])
    
    return (
      <div id="operationsList">
        {operations && operations[0] ? <ul>
          {operations && operations.map((operation, index) => 
          (<OperationCard key={index} operation={operation} userName={user?.name as UserName}/>))}
        </ul> : 
        <p>Vous n'avez pas encore d'opérations déclarées au sein de la guilde {user?.guild}</p>}
      </div>
    )
}


export default OperationsLister;