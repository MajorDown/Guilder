import { useRef } from "react";
import { useManagerContext } from "@/contexts/managerContext";
import loginManager from "@/tools/front/manager/loginManager";
import UIEmailInput from "@/components/UI/UIEmailInput";
import UIPasswordInput from "@/components/UI/UIPasswordInput";
import style from "@/styles/components/manager/ManagerForm.module.css";

/**
 * @description Formulaire de connexion du manager
 * @returns {JSX.Element} - Le formulaire de connexion du manager
 */
const LoginManagerForm = (): JSX.Element => {
    const { updateManager } = useManagerContext();

    const mailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const mail = mailInputRef.current?.value;
        const password = passwordInputRef.current?.value;
        if (!mail || !password) {
            alert("Veuillez remplir tous les champs");
            return;
        }
        try {
            const response = await loginManager({ mail, password });
            updateManager(response);
        } catch (error) {
            alert(("Erreur lors de la connexion : " + error));
        }
};

    return (<form 
        id={'loginManagerForm'} 
        onSubmit={(event) => handleSubmit(event)}
        className={style.form}>
        <div className={style.inputContainer}>
            <label htmlFor={'mail'}>Mail :</label>
            <UIEmailInput 
                id={'mail'} 
                name={'mail'} 
                inputRef={mailInputRef} 
                required
            />
        </div>
        <div className={style.inputContainer}>
            <label htmlFor={'password'}>Password :</label>
            <UIPasswordInput 
                id={'password'} 
                name={'password'} 
                inputRef={passwordInputRef} 
                required
            />
        </div>
        <button type={'submit'} className={'light'}>connection</button>
    </form>)
}

export default LoginManagerForm;