'use client'
import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdminLoginForm from '@/components/AdminLoginForm';
import MemberLoginForm from '@/components/MemberLoginForm';
import { useMemberContext } from '@/contexts/memberContext';
import { useAdminContext } from '@/contexts/adminContext';

type LoginFormType = "membre" | "admin" | undefined;

const Connexion = () => {
  const {member, updateMember} = useMemberContext();
  const {admin, updateAdmin} = useAdminContext();
  const [loginForm, setLoginForm] = useState<LoginFormType>(undefined);

  const logout = () => {
    localStorage.removeItem(process.env.LOCALSTORAGE_MEMBERCONTEXT_KEY as string);
    updateMember(null);
    localStorage.removeItem(process.env.LOCALSTORAGE_ADMINCONTEXT_KEY as string);
    updateAdmin(null);
  }

  const handleGoBack = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setLoginForm(undefined);
  }

  return (
    <section className="section_left">
        <div id={"section_connexion"}>
            {loginForm != undefined && <Image className={"page_logo"} src={`/images/icons/${loginForm}-white-dark.svg`} alt={"logo"} width={120} height={184} priority/>}
            <h2>Page de connexion {loginForm === undefined ? "" : loginForm}</h2>
            {member || admin ? <>
                <p>Cette page est dédié à la connexion des membres et des admin.</p>
                <p>Hors, vous êtes déjà connecté. Souhaitez-vous vous déconnecter ?</p>
                <button onClick={() => logout()}>Déconnexion</button>
            </> : 
            <div id="loginFormSelector">
                {!admin && !member && loginForm === undefined && <>
                    <p>Vous souhaitez vous connecter en tant que :</p>
                    <div id="selector_buttons">
                        <button className={"loginForm_button"} onClick={() => setLoginForm("membre")} >
                            <Image src="/images/icons/membre-white-dark.svg" alt="userIcon" width={100} height={100}/>
                            <p>Membre</p>
                        </button>
                        <button className={"loginForm_button"} onClick={() => setLoginForm("admin")} >
                            <Image src="/images/icons/admin-white-dark.svg" alt="adminIcon" width={100} height={100}/>
                            <p>Admin</p>
                        </button>
                    </div>
                </>}
                {loginForm === "membre" && <p id={"formDescription"} >Déclarez vos interventions et tenez-vous informé des compteurs de points des autres membres de la guilde</p>}
                {loginForm === "admin" && <p id={"formDescription"} >Gérez votre guilde, administrez les coefficients, les inscriptions, les requètes...</p>}
                {loginForm === "membre" && (<MemberLoginForm />)}
                {loginForm === "admin" && (<AdminLoginForm />)}
            </div>}
            <Link id={"goBack"} href={"/"} onClick={(event) => {if (loginForm != undefined) handleGoBack(event)}}>
                <Image src="/images/icons/arrow-white-left.svg" alt="retour" width={30} height={30}/>
                <p>Revenir à l'écran précédent</p>
            </Link>
        </div>
    </section>
  )
}

export default Connexion;