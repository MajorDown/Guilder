import {useState} from 'react';
import Image from 'next/image';
import UIButton from './UI/UIButton';
import AdminLoginForm from './AdminLoginForm';

type LoginFormType = "membre" | "admin" | undefined;

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
            {loginForm === "membre" && (<p>membre</p>)}
            {loginForm === "admin" && (<AdminLoginForm />)}
        </div>
  )
}

export default LoginFormSelector;