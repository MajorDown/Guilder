'use client'
import LoginFormSelector from '@/components/LoginFormSelector';
import { useMemberContext } from '@/contexts/memberContext';
import { useAdminContext } from '@/contexts/adminContext';

const Connexion = () => {
  const {member, updateMember} = useMemberContext();
  const {admin, updateAdmin} = useAdminContext();

  const disconnectMember = () => {
      localStorage.removeItem(process.env.LOCALSTORAGE_MEMBERCONTEXT_KEY as string);
      updateMember(null);
  }

  const disconnectAdmin = () => {
    localStorage.removeItem(process.env.LOCALSTORAGE_ADMINCONTEXT_KEY as string);
    updateAdmin(null);
  }

  const logout = () => {
    disconnectMember();
    disconnectAdmin();
  }

  return (
    <section id="connexionSection">
        <h2>Page de connexion</h2>
            {member || admin ? (<>
              <p>Cette page est dédié à la connexion des membres et des admin.</p>
              <p>Hors, vous êtes déjà connecté. Souhaitez-vous vous déconnecter ?</p>
              <button onClick={() => logout()}>Déconnexion</button>
            </>) : 
            <LoginFormSelector />}
    </section>
  )
}

export default Connexion;