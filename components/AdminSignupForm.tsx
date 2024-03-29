'use client'
import {useEffect, useState, FormEvent, useRef} from 'react'
import { UserMail, UserName, UserPhone, UserPassword, Guild } from '@/types'
import createAdmin from '@/tools/front/createAdmin';
import LoadSpinner from './LoadSpinner';
import UINavLink from './UI/UINavLink';
import UIEmailInput from './UI/UIEmailInput';
import UIFirstnameInput from './UI/UIFirstnameInput';
import UILastnameInput from './UI/UILastnameInput';
import UIPhoneInput from './UI/UIPhoneInput';
import UIButton from './UI/UIButton';
import UIGuildNameInput from './UI/UIGuildNameInput';
import UIPasswordValidator from './UI/UIPasswordValidator';

/**
 * Composant pour un formulaire d'inscription d'administrateur.
 *
 * @returns {JSX.Element} Un formulaire d'inscription d'admin.
 */
const AdminSignupForm = () => {
    const [errMessage, setErrMessage] = useState<string>("");
    const [hasSignup, setHasSignup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const lastNameRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const guildRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSignup = async (event: FormEvent) => {
      event.preventDefault();
      setIsLoading(true);
      const request = {
        mail: mailRef.current?.value, 
        name: `${firstNameRef.current?.value} ${lastNameRef.current?.value}`, 
        password: passwordRef.current?.value, 
        phone: phoneRef.current?.value, 
        guild: guildRef.current?.value};
      const response: Response | Error = await createAdmin(request);
      if (response instanceof Response) {
        setIsLoading(false);
        setHasSignup(true);
      }
      if (response instanceof Error) {
        setIsLoading(false);
        setErrMessage('Un problême à eu lieu lors de la création de votre guilde. Veuillez réessayer plus tard.')
      };
  }  

  return (
    <form onSubmit={(event) => handleSignup(event)}>
        {hasSignup ? <>
            <p>Votre inscription a réussi. Bienvenue ! vous pouvez maintenant 
                vous connecter et gérer votre guilde :
            </p>
            <UINavLink label={"Se connecter"} href={'/connexion'} icon={'/images/icons/admin-white-dark.svg'} />
        </> : <>
          <div className={"horizontalWrapper"}>
            <div className={"verticalWrapper"}>
              <label htmlFor="inputFirstName">Votre prénom :</label>
              <UIFirstnameInput inputRef={firstNameRef} name="inputFirstName" required/>              
            </div>
            <div className={"verticalWrapper"}>
              <label htmlFor="inputLaststName">Votre nom de famille :</label>
              <UILastnameInput inputRef={lastNameRef} name="inputLastName" required/>              
            </div>
          </div>
          <div className={"horizontalWrapper"}>
            <div className={"verticalWrapper"}>
              <label htmlFor="inputMail">Votre Email :</label>
              <UIEmailInput inputRef={mailRef} name="inputMail" required/>
            </div>
            <div className={"verticalWrapper"}>
              <label htmlFor="inputPhone">Votre numéro de tel :</label>
              <UIPhoneInput inputRef={phoneRef} name="inputPhone" required/>              
            </div>
          </div>
            <div className={"verticalWrapper"}>
              <label htmlFor="inputGuild">
                <p>Quel nom avez-vous choisis pour votre guilde ?</p>
                <p>(/!\ Ce nom ne seras plus modifiable. Choisissez bien !)</p>
                </label>
              <UIGuildNameInput inputRef={guildRef} name="inputGuild" required/>    
            </div>
            <div className={"verticalWrapper"}>
              <label htmlFor="inputPassword">
                <p>Votre mot de passe :</p>
                <p>(10 caractères minimum, avec au moins 1 chiffre, 1 lettre minuscule, 1 lettre majuscule et un caractère spécial (@, $, !, %, *, ?, ou &))</p>
                </label>
              <UIPasswordValidator inputRef={passwordRef} name="inputPassword" required/>
            </div>
            <button type={"submit"}>Créer sa guilde</button>
            {errMessage && <p>{errMessage}</p>}
            {isLoading && <LoadSpinner />}
        </>
        }
    </form>
  )
}

export default AdminSignupForm;