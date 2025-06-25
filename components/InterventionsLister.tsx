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
    const [sortMethod, setSortMethod] = useState<"byInterventionDate" | "byDeclarationDate">("byInterventionDate");
    const [sortedInterventionsList, setSortedInterventionsList] = useState<MemberInterventions>();
  
    useEffect(() => {
        if (props.user) {
          const getInterventions = async () => {
            const response = await getMemberInterventions(props.user);
            if (Array.isArray(response)) {
              const sortedInterventions = [...response].sort((a, b) => {
                return new Date(b.interventionDate).getTime() - new Date(a.interventionDate).getTime();
              });
              setInterventionsList(sortedInterventions as MemberInterventions);
            }
          };
          getInterventions();
        }
    }, [props.user]);

//format de declarationDate : "2024-04-22-11-32-10-246"
//format de interventionDate : "2024-04-22"

useEffect(() => {
  if (interventionsList) {
    let sortedInterventions;
    switch (sortMethod) {
      case "byDeclarationDate":
        sortedInterventions = [...interventionsList].sort((a, b) => {
          // Convertit les dates de déclaration en grands nombres entiers pour les comparer
          const numA = parseInt(a.declarationDate.replace(/-/g, ''), 10);
          const numB = parseInt(b.declarationDate.replace(/-/g, ''), 10);
          return numB - numA; // Trie du plus récent au plus ancien
        });
        break;
      case "byInterventionDate":
        sortedInterventions = [...interventionsList].sort((a, b) => {
          // Utilise localeCompare pour trier les chaînes de caractères de dates
          return b.interventionDate.localeCompare(a.interventionDate);
        });
        break;
      default:
        sortedInterventions = [...interventionsList];
    }
    setSortedInterventionsList(sortedInterventions);
  }
}, [sortMethod, interventionsList]); // Dépendances du useEffect
    
    return (
      <div id="interventionsLister">
        {'counter' in props.user && <p>Le solde actuel de votre compteur est de : <b>{props.user.counter.toFixed(2)} points</b></p>}
        <select onChange={(e) => setSortMethod(e.target.value as "byInterventionDate" | "byDeclarationDate")}>
          <option value="byDeclarationDate">Trier par date de déclaration</option>
          <option value="byInterventionDate">Trier par date d'intervention</option>
        </select>
        {sortedInterventionsList && sortedInterventionsList.length > 0 ? <ul className={"scrollable"}>
          {sortedInterventionsList.map((intervention, index) => 
          (<InterventionCard key={index} intervention={intervention} role={"member"} user={props.user}/>))}
        </ul> : 
        <p>Vous n'avez pas encore d'opérations déclarées au sein de la guilde {props.user?.guild}</p>}
      </div>
    )
}


export default InterventionsLister;