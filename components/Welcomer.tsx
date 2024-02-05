'use client'
import { useAdminContext } from '@/contexts/adminContext';
import { useMemberContext } from '@/contexts/memberContext';

const Welcomer = () => {
  const {admin} = useAdminContext();
  const {member} = useMemberContext();

  return (
    <>
      {admin && <p id="Welcomer">Admin : {admin.name}</p>}
      {!admin && member && <p id="Welcomer">Membre : {member.name} ({member.counter} points) ~ Guilde {member.guild}</p>}
    </>
  )
}

export default Welcomer;