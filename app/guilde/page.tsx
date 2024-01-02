'use client'
import { useEffect, useState, Suspense, lazy } from "react";
import { useUserContext } from "@/contexts/userContext";
import AppLink from "@/components/AppLink";
import { getGuildMembers } from "@/tools/front/getGuildMembers";
import { MembersList } from "@/types";
const MembersLister = lazy(() => import("@/components/MembersLister"));
import LoadSpinner from "@/components/LoadSpinner";

const Guilde = () => {
    const {user, updateUser} = useUserContext();
    const [members, setMembers] = useState<MembersList | []>();
    const [loadError, setLoadError] = useState<string>();

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

  if(user) { 
      return (
          <section id="guildSection">
              <h2>Membres de la guilde</h2>
                  {user && members && <>
                      <p>liste des membres de {user.guild} :</p>
                      <MembersLister members={members} />
                  </>}
                  {loadError && <p>Une erreur est survenue lors du chargement des membres : {loadError}</p>}
          </section>
  )}
}

export default Guilde;