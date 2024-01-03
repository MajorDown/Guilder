'use client'
import { useEffect, useState } from "react";
import getUserOperations from "@/tools/front/getUserOperations";
import { useUserContext } from "@/contexts/userContext";
import { Operation, UserOperations } from "@/types";

const Historic = () => {
  const {user} = useUserContext();
  const [operations, setOperations] = useState<UserOperations>();

  useEffect(() => {
    if(user) {
      const getOperation = async () => {
        const operationsList = await getUserOperations(user);
        if (operationsList) setOperations(operationsList as UserOperations)
      }
      getOperation();
      console.log(operations);
    }
  }, [user])

  return (
    <section>
        <h2>Historique de vos opérations</h2>
    </section>
  )
}

export default Historic;