'use client'
import { useAdminContext } from '@/contexts/adminContext';
import { useMemberContext } from '@/contexts/memberContext';

/**
 * @function Welcomer
 * @description Composant pour accueillir l'utilisateur.
 * @returns {JSX.Element} Un message de bienvenue.
 */
const Welcomer = () => {
  const {admin} = useAdminContext();
  const {member} = useMemberContext();

  return (
    <>
      {admin && <p id="Welcomer">Admin : {admin.name}</p>}
      {!admin && member && <p id="Welcomer">Membre : {member.name} ({member.counter.toFixed(2)} points) ~ {member.guild}</p>}
    </>
  )
}

export default Welcomer;