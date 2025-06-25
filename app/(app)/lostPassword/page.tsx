'use client'
import { FormEvent, useRef, useState } from "react";
import UIEmailInput from "@/components/UI/UIEmailInput";
import reinitializePassword from "@/tools/front/reinitializePassword";

const LostPassword = () => {
    const [errMessage, setErrMessage] = useState<string>("")
    const [formIsSend, setFormIsSend] = useState<boolean>(false);

    const typeRef = useRef<HTMLSelectElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const type = typeRef.current?.value;
        const mail = mailRef.current?.value;
        if (!mail) {
            setErrMessage("Veuillez renseigner une adresse mail.");
            return;
        }
        if (type) {
            const response =  await reinitializePassword({mail, type});
            if (response instanceof Error) setErrMessage("Une erreur s'est produite lors de l'envoi du mail");
            else setFormIsSend(true);
        }
    }

    return (
        <section className="section_left">
            <div id={"lostPassword_section"}>
                <h2>Vous avez oublié votre mot de passe ?</h2>
                <p>
                    pas de panique ! renseignez ici votre adresse mail, 
                    et si celle-ci corespond bien à un compte, nous vous 
                    renverrons un nouveau mot de passe généré aléatoirement.
                </p>
                {formIsSend ? <p>Un mail vous a été envoyé à l'adresse renseignée.</p> : <form onSubmit={(event) => handleSubmit(event)}>
                    <label htmlFor="type">Vous souhaitez récupérer le mot de passe d'un compte :</label>
                    <select 
                        name="type" 
                        id="type"
                        ref={typeRef} 
                        required>
                        <option value="member">membre</option>
                        <option value="admin">admin</option>
                    </select>
                    <label htmlFor="mail">Votre adresse mail :</label>
                    <UIEmailInput inputRef={mailRef}/>
                    <button className={"light"} type="submit">Renvoyer un nouveau mot de passe</button>
                    {errMessage && <p className={"formErrorMsg"}>{errMessage}</p>}
                </form>}
            </div>
    </section>
    );
}

export default LostPassword;