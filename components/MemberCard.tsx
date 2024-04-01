import { useState } from "react";
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
  const handleDeleteMember = async (memberName: UserMail) => {
    if (props.adminMode) props.onDelete(memberName);
  }

  return (
    <li className={"memberCard"}>
      <div className={"memberCardResume"}>
        <p className={"memberName"}>{props.member.name}</p>
        <p className={props.member.counter < 0 ? "memberCounter red": "memberCounter"}>{props.member.counter} points</p>
        <p className={"memberMail"}>{props.member.mail}</p>
        <p className={"memberPhone"}>{props.member.phone}</p>
      </div>
      {props.adminMode && <div className={"memberOptions"}>
        <button className={"deleteMemberBtn"} onClick={() => handleDeleteMember(props.member.mail)}>
          <Image src={"/images/icons/trash-white.svg"} alt={"Supprimer le membre"} width={24} height={24}/>
          <p>Supprimer</p>
        </button>
      </div>}
    </li>
  )
}

export default MemberCard;