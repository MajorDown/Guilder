import { useEffect, useState } from "react";
import MemberCard from "@/components/MemberCard";
import { MembersList } from "@/types";
type MembersListerProps = {members: MembersList}

const MembersLister = (props: MembersListerProps) => {
    const [sortMethod, setSortMethod] = useState<string>("counter+");
    const [sortedMembers, setSortedMembers] = useState<MembersList>([]);

    useEffect(() => {
        let sortedMembers;
        switch(sortMethod) {
            case "counter+":
                sortedMembers = [...props.members].sort((a, b) => a.counter - b.counter);
                break;
            case "counter-":
                sortedMembers = [...props.members].sort((a, b) => b.counter - a.counter);
                break;
            case "name+":
                sortedMembers = [...props.members].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-":
                sortedMembers = [...props.members].sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                sortedMembers = [...props.members];
        }
        setSortedMembers(sortedMembers);
    }, [sortMethod, props.members]);

  return (
    <div id="membersList">
        <select 
            name="sortMethod" 
            id="sortMethodInput"
            value={sortMethod}
            onChange={(event) => setSortMethod(event.target.value)}
            >
            <option value="counter+">Par compteur (croissant)</option>
            <option value="counter-">Par compteur (décroissant)</option>
            <option value="name+">Par ordre alphabétique (de A à Z)</option>
            <option value="name-">Par ordre alphabétique (de Z à A)</option>
        </select>
        <ul>
            <li className="memberCard">
                <p className="memberName">nom, Prénom</p>
                <p className="memberCounter">compteur</p>
                <p className="memberMail">adresse mail</p>
                <p className="memberPhone">téléphone</p>
            </li>
            {sortedMembers.map((member, index) => (
                <MemberCard key={index} member={member}/>
            ))}
        </ul>
    </div>
  )
}

export default MembersLister;