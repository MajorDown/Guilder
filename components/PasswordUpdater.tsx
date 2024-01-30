'use client'
import {FormEvent, useRef, useState} from 'react';
import UIPasswordInput from './UI/UIPasswordInput';
import UIPasswordValidator from './UI/UIPasswordValidator';
import UIButton from './UI/UIButton';
import updatePassword from '@/tools/front/updatePassword';

export type PasswordUpdateRequest = {
    lastPassword: string | undefined,
    newPassword: string | undefined,
    role: "user" | "admin" | undefined,
    who: {name: string | undefined, token: string | undefined} | null
}

export type PasswordUpdaterProps = {
    role: "user" | "admin" | undefined,
    who: {name: string | undefined, token: string | undefined} | null
}

const PasswordUpdater = (props: PasswordUpdaterProps) => {
    const lastPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const [isActualised, setIsActualised] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>("");


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(lastPasswordRef.current?.value);
        console.log(newPasswordRef.current?.value);
        const request: PasswordUpdateRequest = {
            lastPassword: lastPasswordRef.current?.value,
            newPassword: newPasswordRef.current?.value,
            role: props.role,
            who: props.who
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
            <label htmlFor="lastPassword">Renseignez votre actuel mot de passe :</label>
            <UIPasswordInput name="lastPassword" inputRef={lastPasswordRef} />
            <label htmlFor="newPassword">
                <p>Choisissez votre nouveau mot de passe :</p>
                <p>(10 caractères minimum, avec au moins 1 chiffre, 1 lettre minuscule, 1 lettre majuscule et un caractère spécial (@, $, !, %, *, ?, ou &))</p>
            </label>
            <UIPasswordValidator inputRef={newPasswordRef}/>
            <UIButton type="submit">Actualiser votre mot de passe</UIButton>       
        </form>}
        {isActualised && <p>Votre mot de passe à bien été actualisé !</p>}
        {!isActualised && errMessage && <p>{errMessage}</p>}
    </div>
  )
}

export default PasswordUpdater;