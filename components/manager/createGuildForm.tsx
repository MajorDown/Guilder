import {useState, useRef} from "react";
import Style from "@/styles/components/manager/ManagerForm.module.css";
import { packages } from "@/constants";
import UIGuildNameInput from "@/components/UI/UIGuildNameInput";
import UISelectInput from "@/components/UI/UISelectInput";
import UITextInput from "@/components//UI/UITextInput";
import UIPhoneInput from "@/components//UI/UIPhoneInput";
import UIEmailInput from "@/components//UI/UIEmailInput";
import UIFirstnameInput from "@/components//UI/UIFirstnameInput";
import UILastnameInput from "@/components//UI/UILastnameInput";

type CreateGuildFormProps = {
    onClose: () => void;
}

const CreateGuildForm = (props: CreateGuildFormProps): JSX.Element => {
    const guildNameRef = useRef<HTMLInputElement>(null);
    const guildpackageRef = useRef<HTMLSelectElement>(null);
    const AdressLine1Ref = useRef<HTMLInputElement>(null);
    const AdressLine2Ref = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const guildPhonephoneRef = useRef<HTMLInputElement>(null);
    const guildMailRef = useRef<HTMLInputElement>(null);
    const adminFirstNameRef = useRef<HTMLInputElement>(null);
    const adminLastNameRef = useRef<HTMLInputElement>(null);
    const adminMailRef = useRef<HTMLInputElement>(null);
    const adminPhoneRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you would typically handle the form submission, e.g., send data to an API
        console.log("Form submitted with values:", {
            guildName: guildNameRef.current?.value,
            guildPackage: guildpackageRef.current?.value,
            addressLine1: AdressLine1Ref.current?.value,
            addressLine2: AdressLine2Ref.current?.value,
            code: codeRef.current?.value,
            city: cityRef.current?.value,
            guildPhone: guildPhonephoneRef.current?.value,
            guildMail: guildMailRef.current?.value,
            adminFirstName: adminFirstNameRef.current?.value,
            adminLastName: adminLastNameRef.current?.value,
            adminMail: adminMailRef.current?.value,
            adminPhone: adminPhoneRef.current?.value
        });
        props.onClose(); // Close the form after submission
    };

    return (
        <form className={Style.form} onSubmit={handleSubmit}>
            <h3>Création d'une nouvelle guilde</h3>
            <p>Commençons par la guilde</p>
            <div className={Style.inputContainer}>
                <label htmlFor="guildName">Nom de la guilde : </label>
                <UIGuildNameInput
                    inputRef={guildNameRef}
                    className={'UIGuildNameInput'}
                    placeholder='ex : Collectif85'
                    required
                    minLength={3}
                    maxLength={20}
                />
            </div>
            <div className={Style.inputContainer}>
                <label htmlFor="guildPackage">Choisissez le package de la guilde : </label>
                <UISelectInput
                    id="guildPackage"
                    className={'UISelectInput'}
                    options={packages.map((pkg) => ({
                        value: pkg.id,
                        name: pkg.id === 0 ? 'pas de paiement' : `Package ${pkg.id} : de ${pkg.rules.min} à ${pkg.rules.max} membres pour ${pkg.price}€`
                    }))}
                    required
                />
            </div>
            <div className={Style.verticalWrapper}>
                <label htmlFor="adress">Adresse de la guilde : </label>
                <UITextInput
                    inputRef={AdressLine1Ref}
                    conditions={{
                        regex: /.*/,
                        error: ""
                    }}
                    placeholder="Adresse (rue, numéro, etc.)"
                    required
                />
                <UITextInput
                    inputRef={AdressLine2Ref}
                    conditions={{
                        regex: /.*/,
                        error: ""
                    }} 
                    placeholder="Complément d'adresse (facultatif)"
                />
                <div className={Style.horizontalWrapper}>
                    <UITextInput
                        inputRef={codeRef}
                        conditions={{
                            regex: /.*/,
                            error: ''
                        }}
                        placeholder="85480"
                        required
                    />
                    <UITextInput
                        inputRef={cityRef}
                        conditions={{
                            regex: /.*/,
                            error: ""
                        }}
                        placeholder="Bournezeau"
                        required
                    />
                </div>
            </div>
            <div className={Style.inputContainer}>
                <label htmlFor="guildPhone">numéro de tel de la guilde : </label>
                <UIPhoneInput
                    inputRef={guildPhonephoneRef}
                    placeholder='0612345678'
                    required
                />
            </div>
            <div className={Style.inputContainer}>
                <label htmlFor="guildMail">Adresse mail de la guilde : </label>
                <UIEmailInput
                    inputRef={guildMailRef}
                    placeholder='ex :'
                    required
                />
            </div>
            <p>Maintenant, les informations du 1er admin de la guilde</p>
            <div className={Style.inputContainer}>
                <label htmlFor="adminFirstName">Prénom de l'admin : </label>
                <UIFirstnameInput
                    inputRef={adminFirstNameRef}
                    placeholder='ex : James'
                    required
                />
            </div>
            <div className={Style.inputContainer}>
                <label htmlFor="adminLastName">Nom de l'admin : </label>
                <UILastnameInput
                    inputRef={adminLastNameRef}
                    placeholder='ex : Bond'
                    required
                />
            </div>
            <div className={Style.inputContainer}>
                <label htmlFor="adminMail">Adresse mail de l'admin : </label>
                <UIEmailInput
                    inputRef={adminMailRef}
                    placeholder='ex : jamesbond@exemple.fr'
                    required
                />
            </div>
            <div className={Style.inputContainer}>
                <label htmlFor="adminPhone">Numéro de tel de l'admin : </label>
                <UIPhoneInput
                    inputRef={adminPhoneRef}
                    placeholder='0612345678'
                    required
                />
            </div>
            <div className={Style.horizontalWrapper}>
                <button className={'dark'} type="submit">Créer la guilde</button>
                <button className={'light'} type="button" onClick={props.onClose}>Fermer le formulaire</button>
            </div>
        </form>
    );
}

export default CreateGuildForm;