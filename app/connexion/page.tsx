'use client'
import LoginFormSelector from '@/components/LoginFormSelector';
import { useUserContext } from '@/contexts/userContext';
import { useAdminContext } from '@/contexts/adminContext';
import { useGuildContext } from '@/contexts/guildContext';

const Connexion = () => {
  const {user, updateUser} = useUserContext();
  const {admin, updateAdmin} = useAdminContext();
  const {updateMembers} = useGuildContext();

  const disconnectUser = () => {
      localStorage.removeItem(process.env.LOCALSTORAGE_USERCONTEXT_KEY as string);
      updateUser(null);
      localStorage.removeItem(process.env.LOCALSTORAGE_GUILDCONTEXT_KEY as string);
      updateMembers(null);
  }

  const disconnectAdmin = () => {
    localStorage.removeItem(process.env.LOCALSTORAGE_ADMINCONTEXT_KEY as string);
    updateAdmin(null);
  }

  const logout = () => {
    disconnectUser();
    disconnectAdmin();
  }

  return (
    <section id="connexionSection">
        <h2>Page de connexion</h2>
            {user || admin ? (<>
              <p>Cette page est dédié à la connexion des membres et des admin.</p>
              <p>Hors, vous êtes déjà connecté. Souhaitez-vous vous déconnecter ?</p>
              <button onClick={() => logout()}>Déconnexion</button>
            </>) : 
            <LoginFormSelector />}
    </section>
  )
}

export default Connexion;