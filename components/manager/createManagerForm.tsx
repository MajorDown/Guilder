import { useRef } from "react";
import createManager from "@/tools/front/manager/createManager";
import UIEmailInput from "@/components/UI/UIEmailInput";
import UIPasswordInput from "@/components/UI/UIPasswordInput";
import style from "@/styles/components/manager/ManagerForm.module.css";

/**
 * @description Formulaire de création de manager
 * @returns {JSX.Element}
 */
const CreateManagerForm = (): JSX.Element => {

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
            const response = await createManager({ mail, password });
            mailInputRef.current!.value = '';
            passwordInputRef.current!.value = '';
            alert("Manager créé avec succès avec l'id " + response);
        } catch (error) {
            alert(("Erreur lors de la connexion : " + error));
        }
    };

    return (<form 
        id={'createManagerForm'} 
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
        <button type={'submit'} className={'light'}>créer</button>
    </form>)
}

export default CreateManagerForm;