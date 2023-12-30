import { Member } from "@/types"

type MemberCardProps = {member: Member}

const MemberCard = (props: MemberCardProps) => {

  return (
    <li className="memberCard">
      <p className="memberName">{props.member.name}</p>
      <p className={props.member.counter < 0 ? "memberCounter red": "memberCounter"}>{props.member.counter} points</p>
      <p className="memberMail">{props.member.mail}</p>
      <p className="memberPhone">{props.member.phone}</p>
    </li>
  )
}

export default MemberCard;