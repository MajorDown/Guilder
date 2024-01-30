'use client'
import { useAdminContext } from '@/contexts/adminContext';
import { useUserContext } from '@/contexts/userContext';

const Welcomer = () => {
  const {admin} = useAdminContext();
  const {user} = useUserContext();

  return (
    <>
      {admin && <p id="Welcomer">Admin : {admin.name}</p>}
      {!admin && user && <p id="Welcomer">Membre : {user.name} ({user.counter} points) ~ Guilde {user.guild}</p>}
    </>
  )
}

export default Welcomer;