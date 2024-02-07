import { Member } from "@/types";

type MemberCardProps = {
  member: Omit<Member, 'password'>
}

const MemberCard = (props: MemberCardProps) => {

  return (
    <li className={"memberCard"}>
      <p className={"memberName"}>{props.member.name}</p>
      <p className={props.member.counter < 0 ? "memberCounter red": "memberCounter"}>{props.member.counter} points</p>
      <div className={"memberInfos"}>
        <p>{props.member.mail}</p>
        <p>{props.member.phone}</p>
      </div>
    </li>
  )
}

export default MemberCard;