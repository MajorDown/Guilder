'use client'
import { useEffect, useState } from "react";
import getUserOperations from "@/tools/front/getUserOperations";
import { useUserContext } from "@/contexts/userContext";
import { ConnectedUser, MembersList, Operation, UserName, UserOperations } from "@/types";
import OperationCard from "./OperationCard";
import { useGuildContext } from "@/contexts/guildContext";

const OperationsLister = () => {
    const {user, updateUser} = useUserContext();
    const {members, updateMembers} = useGuildContext();
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

    const updateLocalData = (deletedOperation: Operation) => {
      // INITIALISATION DES NOUVELLES DATA
      if (user && members) {
        const points = deletedOperation.points;
        const newUser = {...user, counter: user.counter - points}
        const newMembers = members.map((member) => {
          if (member.name === deletedOperation.payer) {
              return { ...member, counter: member.counter + points };
          }
          else if (member.name === deletedOperation.worker) {
              return { ...member, counter: member.counter - points };
          } 
          else {
              return member;
          }
      });
      updateUser(newUser);
      localStorage.setItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_USERCONTEXT_KEY as string, JSON.stringify(newUser));
      updateMembers(newMembers);
      localStorage.setItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_GUILDCONTEXT_KEY as string, JSON.stringify(newMembers));
      }
    }

    const handleDeleteOperation = (deletedOperation: Operation) => {
      setOperations((currentOperations) =>
        currentOperations && currentOperations.filter((operation) => 
          operation.declarationDate !== deletedOperation.declarationDate)
      );
      updateLocalData(deletedOperation);
  };
    
    return (
      <div id="operationsList">
        {operations && operations[0] ? <ul>
          {operations && operations.map((operation, index) => 
          (<OperationCard key={index} operation={operation} userName={user?.name as UserName} onDelete={(deletedOperation) => handleDeleteOperation(deletedOperation)}/>))}
        </ul> : 
        <p>Vous n'avez pas encore d'opérations déclarées au sein de la guilde {user?.guild}</p>}
      </div>
    )
}


export default OperationsLister;