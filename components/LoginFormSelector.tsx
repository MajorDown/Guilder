import {useState} from 'react';
import Image from 'next/image';
import UIButton from './UI/UIButton';
import AdminLoginForm from './AdminLoginForm';
import UserLoginForm from './UserLoginForm';

type LoginFormType = "membre" | "admin" | undefined;

/**
 * Composant pour un sélecteur de formulaire de connexion.
 *
 * @returns {JSX.Element} Un sélecteur de formulaire de connexion.
 */
const LoginFormSelector = () => {
    const [loginForm, setLoginForm] = useState<LoginFormType>(undefined);
    
    return (
        <div id="loginFormSelector">
            <p>Vous souhaitez vous connecter en tant que :</p>
            <div id="selectorButtons">
                <UIButton onClick={() => setLoginForm("membre")} isActive={loginForm === "membre"}>
                    <span>Membre</span>
                    <Image src="/images/user.svg" alt="userIcon" width={32} height={32}/>
                </UIButton>
                <UIButton onClick={() => setLoginForm("admin")} isActive={loginForm === "admin"}>
                    <span>Admin</span>
                    <Image src="/images/admin.svg" alt="adminIcon" width={32} height={32}/>
                </UIButton>
            </div>
            {loginForm === "membre" && <p>Déclarez vos interventions et tenez-vous informé des compteurs de points des autres membres de la guilde</p>}
            {loginForm === "admin" && <p>Gérez votre guilde, administrez les coefficients, les inscriptions, les requètes...</p>}
            {loginForm === "membre" && (<UserLoginForm />)}
            {loginForm === "admin" && (<AdminLoginForm />)}
        </div>
  )
}

export default LoginFormSelector;