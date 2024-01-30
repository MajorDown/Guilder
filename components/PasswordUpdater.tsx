'use client'
import {useRef, useState} from 'react';
import UIPasswordInput from './UI/UIPasswordInput';
import UIPasswordValidator from './UI/UIPasswordValidator';
import UIButton from './UI/UIButton';

export type PasswordUpdaterProps = {
    passwordFor: "user" | "admin";
}

const PasswordUpdater = (props: PasswordUpdaterProps) => {
    const lastPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const [isActualised, setIsActualised] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>("");


    const handleSubmit = () => {
        if (props.passwordFor === "user") {
            // Update user password
        }
        if (props.passwordFor === "admin") {
            // Update admin password
        }
    }

  return (
    <div id="passwordUpdater">
        <h3>Modifiez votre mot de passe</h3>
        <form onSubmit={()=> {handleSubmit()}}>
            <label htmlFor="lastPassword">Renseignez votre actuel mot de passe :</label>
            <UIPasswordInput name="lastPassword" inputRef={lastPasswordRef} />
            <label htmlFor="newPassword">
                <p>Choisissez votre nouveau mot de passe</p>
                <p>(10 caractères minimum, avec au moins 1 chiffre, 1 lettre minuscule, 1 lettre majuscule et un caractère spécial (@, $, !, %, *, ?, ou &))</p>
            </label>
            <UIPasswordValidator inputRef={newPasswordRef}/>
            <UIButton type="submit">Actualiser votre mot de passe</UIButton>       
        </form>
    </div>
  )
}

export default PasswordUpdater;