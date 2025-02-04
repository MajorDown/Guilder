import { useEffect, useState } from "react";
import MemberCard from "@/components/MemberCard";
import { MembersList, UserMail } from "@/types";
import { useAdminContext } from "@/contexts/adminContext";
import deleteMember from "@/tools/front/deleteMember";

export type MembersListerProps = {members: MembersList}

/**
 * @function MembersLister
 * @description Composant pour lister les membres de la guilde.
 * @param {MembersListerProps} props - Les props du composant.
 * @param {MembersList} props.members - La liste des membres de la guilde.
 * @returns {JSX.Element} La liste des membres de la guilde.
 */
const MembersLister = (props: MembersListerProps) => {
    const {admin} = useAdminContext();
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [sortMethod, setSortMethod] = useState<string>("counter+");
    const [sortedMembers, setSortedMembers] = useState<MembersList>([]);
    const [zeroFilter, setZeroFilter] = useState<boolean>(false);

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

    const handleDeleteMember = async (memberMail: UserMail) => {
        const confirmation = window.confirm(`La suppression d'un membre est irreversible, 
        car l'ensemble des données le concernant seront supprimées. 
        Etes-vous sûr de vouloir supprimer le membre "${memberMail}"?`);
        if (admin && confirmation) {
            const request = await deleteMember(memberMail, admin);
            if (request instanceof Error) {
                console.error("handleDeleteMember ~> Error:", request);
            }
            else {
                const newMembersList = sortedMembers.filter((member) => member.mail !== memberMail);
                setSortedMembers(newMembersList);
            }
        }
    }

  return (
    <div id="membersList" className={"scrollable"}>
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
        <div id={"zeroFilter"}>
            <input 
                type="checkbox" 
                id="zeroFilterInput" 
                name="zeroFilter" 
                checked={zeroFilter}
                onChange={(event) => setZeroFilter(event.target.checked)}
            />
            <label htmlFor="zeroFilter">Masquer les membres dont le compteur est à 0</label>
        </div>
        {isEmpty ? 
            <p>Il n'y a pas encore de membres au sein de la guilde</p> : 
            <ul>
                {zeroFilter ? sortedMembers.filter((member) => member.counter !== 0).map((member, index) => (
                    <MemberCard key={member.name} member={member} onDelete={(memberMail) => handleDeleteMember(memberMail)} adminMode={admin ? true : false}/>
                )) : sortedMembers.map((member, index) => (
                    <MemberCard key={member.name} member={member} onDelete={(memberMail) => handleDeleteMember(memberMail)} adminMode={admin ? true : false}/>
                ))}
            </ul>
        }
    </div>
  )
}

export default MembersLister;