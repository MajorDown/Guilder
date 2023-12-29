'use client'
import { useUserContext } from "@/contexts/userContext";
import AppLink from "@/components/AppLink";
import { useEffect, useState } from "react";
import { getGuildMembers } from "@/tools/front/getGuildMembers";
import { MembersList } from "@/types";

const Guilde = () => {
    const {user, updateUser} = useUserContext();
    const [members, setMembers] = useState<MembersList | []>();

    useEffect(() => {
        const fetchMembers = async () => {
          if (user) {
            try {
              const guildMembers = await getGuildMembers(user.guild, user.token);
              setMembers(guildMembers);
              console.log("membres :", guildMembers);
            } catch (error) {
              console.error("Erreur lors de la récupération des membres de la guilde :", error);
            }
          }
        };      
        fetchMembers();
      }, [user]);

  return (
    <section id="guildSection">
        <h2>Membres de la guilde</h2>
        <div>
        {!user && <>
            <p>Vous devez être connecté pour accéder à cette page.</p>
            <AppLink href="/connexion" showActivation>Connexion</AppLink>
        </>}
        {user && members && <>
            <p>liste des membres :</p>
            {members.map((member, index) => (
                <p key={index}>{member.name}, {member.mail}, {member.counter} points, {member.phone}</p>
            ))}
        </>}
        </div>
    </section>
  )
}

export default Guilde;