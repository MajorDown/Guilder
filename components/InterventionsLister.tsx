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
        if (props.user) {
          const getInterventions = async () => {
            const response = await getMemberInterventions(props.user);
            if (Array.isArray(response)) { // Check if response is an array
              console.log(response);
              // Assure-toi que la réponse est un tableau avant de tenter de trier
              const sortedInterventions = [...response].sort((a, b) => {
                // Convertit les dates en objets Date pour les comparer
                return new Date(b.interventionDate).getTime() - new Date(a.interventionDate).getTime();
              });
              setInterventionsList(sortedInterventions as MemberInterventions);
            }
          };
          getInterventions();
        }
  }, [props.user]);
    
    return (
      <div id="interventionsLister">
        {'counter' in props.user && <p>Le solde actuel de votre compteur est de : {props.user.counter.toFixed(2)} points</p>}
        {interventionsList && interventionsList[0] ? <ul>
          {interventionsList && interventionsList.map((intervention, index) => 
          (<InterventionCard key={index} intervention={intervention} role={"member"} user={props.user}/>))}
        </ul> : 
        <p>Vous n'avez pas encore d'opérations déclarées au sein de la guilde {props.user?.guild}</p>}
      </div>
    )
}


export default InterventionsLister;