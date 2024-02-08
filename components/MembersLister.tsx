import { useEffect, useState } from "react";
import MemberCard from "@/components/MemberCard";
import { MembersList, UserMail } from "@/types";
import { useAdminContext } from "@/contexts/adminContext";

type MembersListerProps = {members: MembersList}

const MembersLister = (props: MembersListerProps) => {
    const {admin} = useAdminContext();
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [sortMethod, setSortMethod] = useState<string>("counter+");
    const [sortedMembers, setSortedMembers] = useState<MembersList>([]);

    useEffect(() => {
        let sortedMembers;
        if (props.members != null) {
            setIsEmpty(false);
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
        }
        else setIsEmpty(true);
    }, [sortMethod, props.members]);

    const handleDeleteMember = (memberMail: UserMail) => {
        const confirmation = window.confirm(`La suppression d'un membre est irreversible, 
        car l'ensemble des données le concernant seront supprimées. 
        Etes-vous sûr de vouloir supprimer le membre "${memberMail}"?`);
        if (admin && confirmation) {
            // Ajoutez le code pour supprimer le membre de la guilde
        }
    }

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
        {isEmpty ? 
            <p>Il n'y a pas encore de membres au sein de la guilde</p> : 
            <ul>
                {sortedMembers.map((member, index) => (
                    <MemberCard key={index} member={member} onDelete={(memberMail) => handleDeleteMember(memberMail)} adminMode={admin ? true : false}/>
                ))}
            </ul>
        }
    </div>
  )
}

export default MembersLister;