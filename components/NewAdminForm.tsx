import { FormEvent, useRef, useState} from "react";
import UIFirstnameInput from "./UI/UIFirstnameInput";
import UILastnameInput from "./UI/UILastnameInput";
import UIEmailInput from "./UI/UIEmailInput";
import UIPhoneInput from "./UI/UIPhoneInput";
import UIButton from "./UI/UIButton";
import { ConnectedAdmin, UserMail, UserPhone } from "@/types";
import createAdmin from "@/tools/front/createAdmin";


const NewAdminForm = () => {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    
    return (
        <div id={"newAdminForm"}>
            <h3>Ajouter un nouvel administrateur pour la Guilde</h3>
            <p>Besoin d'un coup de main pour gérer votre guilde ? Nommez un admin Supplémentaire !
                il recevra un email de confirmation à l'adresse que vous avez renseignée.
            </p>
            <form>
                <label htmlFor="lastname">Son Prénom :</label>
                <UIFirstnameInput inputRef={firstNameRef} required />
                <label htmlFor="firstname">Son nom de famille:</label>
                <UILastnameInput inputRef={lastNameRef} required />
                <label htmlFor="mail">son adresse mail :</label>
                <UIEmailInput inputRef={mailRef} required />
                <label htmlFor="passwordConfirm">Son numéro de téléphone :</label>
                <UIPhoneInput inputRef={phoneRef} required />
                <UIButton type="submit">Créer le nouvvel admin</UIButton>
            </form>
        </div>
    )
}

export default NewAdminForm;