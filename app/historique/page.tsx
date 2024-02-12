'use client'
import {useState, useEffect} from "react";
import { useMemberContext } from "@/contexts/memberContext";
import UINavLink from "@/components/UI/UINavLink";
import InterventionsLister from "@/components/InterventionsLister";

const Historic = () => {
  const { member } = useMemberContext();
  const [checkedMember, setCheckedMember] = useState(false);

  useEffect(() => {
      setCheckedMember(true);
  }, [member])

  return (
    <section id={"historicSection"}>
        <h2>Historique de vos interventions</h2>
        {checkedMember && !member && <>
            <p>Vous devez être connecté pour accéder à cette page !</p>
            <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
        </>}
        {checkedMember && member && <>
            <p>Consultez ici l'historique des interventions vous concernant.</p>
            <p>*Dans le cas ou vous constatez une erreur de déclaration, vous avez 
              la possibilité de la contester si celle-ci date de maximum 48h.
            </p>
        <InterventionsLister user={member} />
        </>}
    </section>
  )
}

export default Historic;