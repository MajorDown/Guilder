'use client'
import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import AppLink from "@/components/AppLink";
import { getGuildMembers } from "@/tools/front/getGuildMembers";
import { MembersList } from "@/types";
import MembersLister from "@/components/MembersLister";
import LoadSpinner from "@/components/LoadSpinner";

const Guilde = () => {
    const {user, updateUser} = useUserContext();
    const [members, setMembers] = useState<MembersList | []>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadError, setLoadError] = useState<string>();

    useEffect(() => {
        setIsLoading(true);
        const fetchMembers = async () => {
          if (user) {
            try {
              const guildMembers = await getGuildMembers(user.guild, user.token);
              setMembers(guildMembers);
              setIsLoading(false);
            } catch (error) {
              setLoadError("erreur lors du chargement des membres de la guilde");
            }
          }
        };      
        fetchMembers();
        setIsLoading(false);
      }, [user]);

  return (
    <section id="guildSection">
        <h2>Membres de la guilde</h2>
        {isLoading && <LoadSpinner />}
        {loadError && <p>Une erreur est survenue lors du chargement des membres : {loadError}</p>}
        {!isLoading && !user && <>
            <p>Vous devez être connecté pour accéder à cette page.</p>
            <AppLink href="/connexion" showActivation>Connexion</AppLink>
        </>}
        {user && members && <>
        <p>liste des membres de {user.guild} :</p>
        <MembersLister members={members} />
        </>}
    </section>
  )
}

export default Guilde;