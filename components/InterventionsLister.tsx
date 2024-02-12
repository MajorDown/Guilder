'use client'
import { useEffect, useState } from "react";
import getMemberInterventions from "@/tools/front/getMemberInterventions";
import { ConnectedMember, ConnectedAdmin, MemberInterventions } from "@/types";
import InterventionCard from "./InterventionCard";

export type InterventionsListerProps = {
  user : ConnectedMember | ConnectedAdmin
}

const InterventionsLister = (props: InterventionsListerProps) => {
    const [interventionsList, setInterventionsList] = useState<MemberInterventions>();
  
    useEffect(() => {
      if(props.user) {
        const getInterventions = async () => {
          const response = await getMemberInterventions(props.user);
          if (response) {
            console.log(response);
            setInterventionsList(response as MemberInterventions);
          }
        }
        getInterventions();
      }
    }, [props.user]);
    
    return (
      <div id="interventionsLister">
        {interventionsList && interventionsList[0] ? <ul>
          {interventionsList && interventionsList.map((intervention, index) => 
          (<InterventionCard key={index} intervention={intervention} asUser={"member"} />))}
        </ul> : 
        <p>Vous n'avez pas encore d'opérations déclarées au sein de la guilde {props.user?.guild}</p>}
      </div>
    )
}


export default InterventionsLister;