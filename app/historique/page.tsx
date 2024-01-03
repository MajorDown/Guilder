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
        const response = await getUserOperations(user);
        console.log(response)
        if (response)
        setOperations(response as UserOperations);
      }
      getOperation();
    }
  }, [user])

  return (
    <section>
        <h2>Historique de vos opérations</h2>
        {operations && operations.map((operation, index) => {
          return (<p key={index}>{operation.date}</p>)})}
    </section>
  )
}

export default Historic;