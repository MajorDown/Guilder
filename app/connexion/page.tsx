'use client'
import {useState} from 'react';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

type FormType = "login" | "signup";

const Connexion = () => {
    const [form, setForm] = useState<FormType>("login");

  return (
    <section id="connexionSection">
        <h2>Page de connexion</h2>
        <div id="formSelector">
            {form === "signup" && <>
            <p>Vous avez déjà un compte ?</p>
            <button onClick={() => setForm("login")}>Connectez-vous</button>
            </>}
            {form === "login" && <>
            <p>Vous n'avez pas encore de compte ?</p>
            <button onClick={() => setForm("signup")}>Inscrivez-vous</button>
            </>}
        </div>
        {form === "login" && <LoginForm />}
        {form === "signup" && <SignupForm />}        
    </section>
  )
}

export default Connexion;