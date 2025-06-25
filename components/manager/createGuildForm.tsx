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
import createNewGuildAndAdmin from "@/tools/front/guildConfig/createNewGuildAndAdmin";
import { useManagerContext } from "@/contexts/managerContext";
import { ConnectedManager } from "@/types";

type CreateGuildFormProps = {
    onClose: () => void;
}

const CreateGuildForm = (props: CreateGuildFormProps): JSX.Element => {
    const { manager } = useManagerContext();
    const [error, setError] = useState<string>('');

    const guildNameRef = useRef<HTMLInputElement>(null);
    const guildpackageRef = useRef<HTMLSelectElement>(null);
    const AdressLine1Ref = useRef<HTMLInputElement>(null);
    const AdressLine2Ref = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const guildPhoneRef = useRef<HTMLInputElement>(null);
    const guildMailRef = useRef<HTMLInputElement>(null);
    const adminFirstNameRef = useRef<HTMLInputElement>(null);
    const adminLastNameRef = useRef<HTMLInputElement>(null);
    const adminMailRef = useRef<HTMLInputElement>(null);
    const adminPhoneRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const guildName = guildNameRef.current?.value.trim();
        const guildPackage = guildpackageRef.current?.value;
        const adressLine1 = AdressLine1Ref.current?.value.trim();
        const adressLine2 = AdressLine2Ref.current?.value.trim();
        const code = codeRef.current?.value.trim();
        const city = cityRef.current?.value.trim();
        const guildPhone = guildPhoneRef.current?.value.trim();
        const guildMail = guildMailRef.current?.value.trim();
        const adminFirstName = adminFirstNameRef.current?.value.trim();
        const adminLastName = adminLastNameRef.current?.value.trim();
        const adminMail = adminMailRef.current?.value.trim();
        const adminPhone = adminPhoneRef.current?.value.trim();
        // Validate inputs
        if (!guildName || !guildPackage || !adressLine1 || !code || !city || !guildPhone || !guildMail || !adminFirstName || !adminLastName || !adminMail || !adminPhone) {
            setError('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        try {
            const response = await createNewGuildAndAdmin({
                manager: manager as ConnectedManager,
                newGuild: {
                    name: guildName,
                    phone: guildPhone,
                    mail: guildMail,
                    adress: {
                        line1: adressLine1,
                        line2: adressLine2 || '',
                        code: code,
                        city: city
                    },
                    packageId: parseInt(guildPackage, 10) as 0 | 1 | 2 | 3 | 4
                },
                newAdmin: {
                    firstName: adminFirstName,
                    lastName: adminLastName,
                    mail: adminMail,
                    phone: adminPhone
                }
            });
            props.onClose(); // Close the form after submission
        } catch (err) {
            console.error(err);
            setError('Une erreur est survenue lors de la création de la guilde. Veuillez réessayer plus tard.');
        }
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
                    inputRef={guildpackageRef}
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
                    inputRef={guildPhoneRef}
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
            {error && error !== '' && <p className={Style.error}>{error}</p>}
            <div className={Style.horizontalWrapper}>
                <button className={'dark'} type="submit">Créer la guilde</button>
                <button className={'light'} type="button" onClick={props.onClose}>Fermer le formulaire</button>
            </div>
        </form>
    );
}

export default CreateGuildForm;