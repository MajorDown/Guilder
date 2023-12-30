'use client'
import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import AppLink from "@/components/AppLink";
import MemberCard from "@/components/MemberCard";
import { getGuildMembers } from "@/tools/front/getGuildMembers";
import { MembersList } from "@/types";

const Guilde = () => {
    const {user, updateUser} = useUserContext();
    const [members, setMembers] = useState<MembersList | []>();
    const [loadError, setLoadError] = useState<any>();

    useEffect(() => {
        const fetchMembers = async () => {
          if (user) {
            try {
              const guildMembers = await getGuildMembers(user.guild, user.token);
              setMembers(guildMembers);
            } catch (error) {
              setLoadError("erreur lors du chargement des membres de la guilde");
            }
          }
        };      
        fetchMembers();
      }, [user]);

  return (
    <section id="guildSection">
        <h2>Membres de la guilde</h2>
        {loadError && <p>Une erreur est survenue lors du chargement des membres : {loadError}</p>}
        {!user && <>
            <p>Vous devez être connecté pour accéder à cette page.</p>
            <AppLink href="/connexion" showActivation>Connexion</AppLink>
        </>}
        {user && members && <>
        <p>liste des membres de {user.guild} :</p>
        <div id="membersList">
            <ul>
              <li className="memberCard">
                <p className="memberName">nom, Prénom</p>
                <p className="memberCounter">compteur</p>
                <p className="memberMail">adresse mail</p>
                <p className="memberPhone">téléphone</p>
              </li>
              {members.map((member, index) => (
                <MemberCard key={index} member={member}/>
              ))}
            </ul>
        </div>
        </>}
    </section>
  )
}

export default Guilde;