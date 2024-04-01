import { FormEvent, useRef, useState} from "react";
import UIFirstnameInput from "./UI/UIFirstnameInput";
import UILastnameInput from "./UI/UILastnameInput";
import UIEmailInput from "./UI/UIEmailInput";
import UIPhoneInput from "./UI/UIPhoneInput";
import UIButton from "./UI/UIButton";
import createAnotherAdmin from "@/tools/front/createAnotherAdmin";
import { ConnectedAdmin } from "@/types";

export type NewAdminFormProps = {
    actualAdmin: ConnectedAdmin;
}

/**
 * Composant NewAdminForm
 * @param {NewAdminFormProps} props - Les propriétés du composant.
 * @param {ConnectedAdmin} props.actualAdmin - L'admin connecté.
 * @returns {JSX.Element} Le composant NewAdminForm
 */
const NewAdminForm = (props: NewAdminFormProps) => {
    const [error, setError] = useState<string>("");
    const [adminIsCreated, setAdminIsCreated] = useState<boolean>(false);


    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (firstNameRef.current && lastNameRef.current && mailRef.current && phoneRef.current) {
            const newAdmin = {
                name: firstNameRef.current.value + " " + lastNameRef.current.value,
                mail: mailRef.current.value,
                phone: phoneRef.current.value,
                guild: props.actualAdmin.guild,
            }
            const response = await createAnotherAdmin(newAdmin, props.actualAdmin);
            if (response instanceof Error) {
                setError("Une erreur est survenue lors de la création de l'admin. Réessayez plus tard");
            } else {
                setAdminIsCreated(true);
                firstNameRef.current.value = "";
                lastNameRef.current.value = "";
                mailRef.current.value = "";
                phoneRef.current.value = "";
                setError("");
            }
        }
    }
    
    return (
        <div id={"newAdminForm"}>
            <h3>Ajouter un nouvel administrateur pour la Guilde</h3>
            <p>Besoin d'un coup de main pour gérer votre guilde ? Nommez un admin Supplémentaire !
                il recevra un email de confirmation à l'adresse que vous avez renseignée.
            </p>
            {!adminIsCreated && <form onSubmit={(event) => handleSubmit(event)}>
                <div className={"wrapper-vertical"}>
                    <label htmlFor="lastname">Son Prénom :</label>
                    <UIFirstnameInput inputRef={firstNameRef} required />
                </div>
                <div className={"wrapper-vertical"}>
                    <label htmlFor="firstname">Son nom de famille:</label>
                    <UILastnameInput inputRef={lastNameRef} required />
                </div>
                <div className={"wrapper-vertical"}>
                    <label htmlFor="mail">son adresse mail :</label>
                    <UIEmailInput inputRef={mailRef} required />
                </div>
                <div className={"wrapper-vertical"}>
                    <label htmlFor="phoneInput">Son numéro de téléphone :</label>
                    <UIPhoneInput id={"phoneInput"} inputRef={phoneRef} required />
                </div>
                <button className={"light"} type="submit">Créer le nouvel admin</button>
            </form>}
            {adminIsCreated && <>
                <p>L'admin a bien été créé ! Vous souhaitez en ajouter un autre ?</p>
                <UIButton onClick={() => setAdminIsCreated(false)}>Créer un nouvel admin</UIButton>
            </>}
            {error && <p className={"formErrorMsg"}>{error}</p>}
        </div>
    )
}

export default NewAdminForm;