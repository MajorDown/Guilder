'use client'
import {FormEvent, useRef, useState} from 'react';
import UIPasswordInput from './UI/UIPasswordInput';
import UIPasswordValidator from './UI/UIPasswordValidator';
import UIButton from './UI/UIButton';
import updatePassword from '@/tools/front/updatePassword';
import { UserMail, UserStatus } from '@/types';

export type PasswordUpdateRequest = {
    lastPassword: string | undefined,
    newPassword: string | undefined,
    status: UserStatus | undefined,
    user: {mail: UserMail | undefined, token: string | undefined} | null
}

export type PasswordUpdaterProps = {
    status: UserStatus | undefined,
    user: {
        mail: string | undefined;
        token: string | undefined
    } | null
}

/**
 * @function PasswordUpdater
 * @description Composant pour la mise à jour du mot de passe.
 * @param {PasswordUpdaterProps} props - Les props du composant.
 * @param {UserStatus} props.status - Le status de l'utilisateur.
 * @param {{mail: string, token: string}} props.user - L'utilisateur.
 * @returns {JSX.Element} Un formulaire de mise à jour du mot de passe.
 */
const PasswordUpdater = (props: PasswordUpdaterProps) => {
    const lastPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const [isActualised, setIsActualised] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const request: PasswordUpdateRequest = {
            lastPassword: lastPasswordRef.current?.value,
            newPassword: newPasswordRef.current?.value,
            status: props.status,
            user: props.user
        };
        const response: Response | Error = await updatePassword(request);
        if (response instanceof Response && response.status === 200) {
            setIsActualised(true);
        } 
        else if (response instanceof Error) {
            setErrMessage("Il semble que votre ancien mot de passe soit incorrect");
        }
    }

  return (
    <div id="passwordUpdater">
        <h3>Modifiez votre mot de passe</h3>
        {!isActualised && <form onSubmit={(event)=> {handleSubmit(event)}}>
            <div className={"wrapper-vertical"}>
                <label htmlFor="lastPassword">Renseignez votre actuel mot de passe :</label>
                <UIPasswordInput name="lastPassword" inputRef={lastPasswordRef} />
            </div>
            <div className={"wrapper-vertical"}>
                <label htmlFor="newPassword">
                    <p>Choisissez votre nouveau mot de passe :</p>
                    <p>(10 caractères minimum, avec au moins 1 chiffre, 1 lettre minuscule, 1 lettre majuscule et un caractère spécial (@, $, !, %, *, ?, ou &))</p>
                </label>
                <UIPasswordValidator inputRef={newPasswordRef}/>
            </div>
            <button className={"light"} type="submit">Actualiser votre mot de passe</button>       
        </form>}
        {isActualised && <p>Votre mot de passe à bien été actualisé !</p>}
        {!isActualised && errMessage && <p className={"formErrorMsg"}>{errMessage}</p>}
    </div>
  )
}

export default PasswordUpdater;