'use client'
import { useEffect, useState } from "react";
import getUserOperations from "@/tools/front/getUserOperations";
import { useUserContext } from "@/contexts/userContext";
import { UserOperations } from "@/types";
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
        <ul>
          <li className="operationCard">
            <p className="operationDate">Date</p>
            <p className="operationWorker">Membre aidant</p>
            <p className="operationPayer">Membre aidé</p>
            <p className="operationPoints">transaction</p>
          </li>
          {operations && operations.map((operation, index) => 
          (<OperationCard key={index} operation={operation} />))}
        </ul>
      </div>
    )
}


export default OperationsLister;