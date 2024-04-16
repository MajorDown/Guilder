'use client'
import { useEffect, useState } from "react";
import getMemberInterventions from "@/tools/front/getMemberInterventions";
import { ConnectedMember, ConnectedAdmin, MemberInterventions } from "@/types";
import InterventionCard from "./InterventionCard";

export type InterventionsListerProps = {
  user : ConnectedMember | ConnectedAdmin
}

/**
 * @function InterventionsLister
 * @description Composant pour lister les interventions d'un membre.
 * @param {InterventionsListerProps} props - Les props du composant.
 * @param {ConnectedMember} props.user - Le membre connecté.
 * @returns {JSX.Element} La liste des interventions du membre.
 */
const InterventionsLister = (props: InterventionsListerProps) => {
    const [interventionsList, setInterventionsList] = useState<MemberInterventions>();
  
    useEffect(() => {
        if (props.user) {
          const getInterventions = async () => {
            const response = await getMemberInterventions(props.user);
            if (Array.isArray(response)) {
              console.log(response);
              const sortedInterventions = [...response].sort((a, b) => {
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
        {'counter' in props.user && <p>Le solde actuel de votre compteur est de : <b>{props.user.counter.toFixed(2)} points</b></p>}
        {interventionsList && interventionsList[0] ? <ul className={"scrollable"}>
          {interventionsList && interventionsList.map((intervention, index) => 
          (<InterventionCard key={index} intervention={intervention} role={"member"} user={props.user}/>))}
        </ul> : 
        <p>Vous n'avez pas encore d'opérations déclarées au sein de la guilde {props.user?.guild}</p>}
      </div>
    )
}


export default InterventionsLister;