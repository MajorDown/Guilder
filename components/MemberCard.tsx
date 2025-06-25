import { useEffect, useState } from "react";
import { Member, UserMail } from "@/types";
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
  const [roundedCounter, setRoundedCounter] = useState<string>("0.00");

  const handleDeleteMember = async (memberName: UserMail) => {
    if (props.adminMode) props.onDelete(memberName);
  }
  {/* il faut arrondir memberCounter à deux décimales */}
  useEffect(() => {
    if (props.member.counter) {
      setRoundedCounter(props.member.counter.toFixed(2));
    }
  }, [])
  
  
  return (
    <li className={"memberCard"}>
      <div className={"memberCardResume"}>
        <p className={"memberName"}>{props.member.name}</p>
        <p className={props.member.counter < 0 ? "memberCounter red": "memberCounter"}>{roundedCounter} points</p>
        <div className={"memberContact"}>
          <p className={"memberPhone"}>{props.member.phone}</p>
          {props.adminMode && <p className={"memberMail"}>{props.member.mail}</p>}
        </div>
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