'use client'
import { useMemberContext } from "@/contexts/memberContext";
import InterventionsLister from "@/components/InterventionsLister";
import PageForMember from "@/components/PageForMember";

const Historic = () => {
  const { member } = useMemberContext();

  return (<PageForMember 
      title={"Historique de vos interventions"} 
      pseudoTitle={"Historique"} 
      id={"section_historique"}
  >
      {member && <InterventionsLister user={member} />}
  </PageForMember>)
}

export default Historic;