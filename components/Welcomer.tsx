'use client'
import { useAdminContext } from '@/contexts/adminContext';
import { useUserContext } from '@/contexts/userContext';

const Welcomer = () => {
  const {admin} = useAdminContext();
  const {user} = useUserContext();

  return (
    <>
      {admin && <p id="Welcomer">Admin : ${admin.name}</p>}
      {!admin && user && <p id="Welcomer">User : {user.name} | Guilde: {user.guild} | Compteur : {user.counter} points</p>}
    </>
  )
}

export default Welcomer;