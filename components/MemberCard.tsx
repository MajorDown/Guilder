import { useState, useEffect } from "react";
import { Member, UserMail } from "@/types";
import UIButton from "./UI/UIButton";
import Image from "next/image";

export type MemberCardProps = {
  adminMode: boolean;
  member: Omit<Member, 'password'>
  onDelete: (memberName: UserMail) => void;
}

/**
 * @function MemberCard
 * @description Composant pour une carte de membre.
 * @param {MemberCardProps} props - Les props du composant.
 * @param {boolean} props.adminMode - Le mode administrateur.
 * @param {Member} props.member - Le membre à afficher.
 * @param {(memberName: UserMail) => void} props.onDelete - La fonction de suppression d'un membre.
 * @returns {JSX.Element} Une carte de membre.
 */
const MemberCard = (props: MemberCardProps) => {
  const [wantHistoric, setWantHistoric] = useState<boolean>(false);

  const handleDeleteMember = async (memberName: UserMail) => {
    if (props.adminMode) props.onDelete(memberName);
  }

  return (
    <li className={"memberCard"}>
      <div className={"memberCardResume"}>
        <p className={"memberName"}>{props.member.name}</p>
        <p className={props.member.counter < 0 ? "memberCounter red": "memberCounter"}>{props.member.counter} points</p>
        <div className={"memberInfos"}>
          <p>{props.member.mail}</p>
          <p>{props.member.phone}</p>
        </div>
        {props.adminMode && <div className={"memberOptions"}>
          <UIButton onClick={() => setWantHistoric(!wantHistoric)}>
            <Image src={wantHistoric ? "/images/minimize.svg" : "/images/stats.svg"} alt={"Voir l'historique"} width={24} height={24}/>
          </UIButton>
          <UIButton onClick={() => handleDeleteMember(props.member.mail)}>
            <Image src={"/images/trash.svg"} alt={"Supprimer le membre"} width={24} height={24}/>
          </UIButton>
        </div>}
      </div>
      {wantHistoric && <div className={"memberCardHistoric"}>historique (en cours de développement)</div>}
    </li>
  )
}

export default MemberCard;