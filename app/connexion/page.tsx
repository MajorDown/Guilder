'use client'
import {useState} from 'react';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import { useUserContext } from '@/contexts/userContext';
import AppButton from '@/components/AppButton';

type FormType = "login" | "signup";

const Connexion = () => {
  const {user, updateUser} = useUserContext();
    const [form, setForm] = useState<FormType>("login");

    const disconnectUser = () => {
      localStorage.removeItem(process.env.LOCALSTORAGE_USERCONTEXT_KEY as string);
      updateUser(null);
    }

  return (
    <section id="connexionSection">
        <h2>Page de connexion</h2>
        <div id="formSelector">
            {user && <>
              <p>Cette page est dédié à la connexion des utilisateurs.</p>
              <p>Hors, vous êtes déjà connecté. Souhaitez-vous vous déconnecter ?</p>
              <AppButton onClick={() => disconnectUser()}>Déconnexion</AppButton>
            </>}
            {!user && form === "signup" && <>
              <p>Vous avez déjà un compte ?</p>
              <button onClick={() => setForm("login")}>Connectez-vous</button>
            </>}
            {!user && form === "login" && <>
              <p>Vous n'avez pas encore de compte ?</p>
              <button onClick={() => setForm("signup")}>Inscrivez-vous</button>
            </>}
        </div>
        {!user && form === "login" && <LoginForm />}
        {!user && form === "signup" && <SignupForm />}
    </section>
  )
}

export default Connexion;