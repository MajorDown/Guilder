'use client'
import { useState, lazy } from "react";
import { useUserContext } from "@/contexts/userContext";
import { useGuildContext } from "@/contexts/guildContext";
const MembersLister = lazy(() => import("@/components/MembersLister"));

const Guilde = () => {
    const {user} = useUserContext();
    const {members} = useGuildContext();
    const [loadError, setLoadError] = useState<string>();

  if(members) { 
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