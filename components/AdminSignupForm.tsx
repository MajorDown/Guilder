'use client'
import {useState, FormEvent, useRef} from 'react'
import createAdmin from '@/tools/front/createAdmin';
import LoadSpinner from './LoadSpinner';
import UIEmailInput from './UI/UIEmailInput';
import UIFirstnameInput from './UI/UIFirstnameInput';
import UILastnameInput from './UI/UILastnameInput';
import UIPhoneInput from './UI/UIPhoneInput';
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
        setErrMessage('Un problême à eu lieu lors de la création de la guilde. Veuillez réessayer plus tard.')
      };
  }  

  return (
    <form id={"adminSignupForm"} onSubmit={(event) => handleSignup(event)}>
        {hasSignup ? <>
            <p>L'inscription a réussi.</p>
        </> : <>
          <div className={"wrapper-horizontal"}>
            <div className={"wrapper-vertical"}>
              <label htmlFor="inputFirstName">prénom de l'admin :</label>
              <UIFirstnameInput inputRef={firstNameRef} name="inputFirstName" required/>              
            </div>
            <div className={"wrapper-vertical"}>
              <label htmlFor="inputLaststName">nom de l'admin :</label>
              <UILastnameInput inputRef={lastNameRef} name="inputLastName" required/>              
            </div>
          </div>
          <div className={"wrapper-horizontal"}>
            <div className={"wrapper-vertical"}>
              <label htmlFor="inputMail">Email de l'admin :</label>
              <UIEmailInput inputRef={mailRef} name="inputMail" required/>
            </div>
            <div className={"wrapper-vertical"}>
              <label htmlFor="inputPhone">Numéro de tel de l'admin :</label>
              <UIPhoneInput inputRef={phoneRef} name="inputPhone" required/>              
            </div>
          </div>
            <div className={"wrapper-vertical"}>
              <label htmlFor="inputGuild">Quel sera le nom de la Guilde ?</label>
              <UIGuildNameInput id={"guildNameInput"} inputRef={guildRef} name="inputGuild" required/>    
            </div>
            <div className={"wrapper-vertical"} id={"passwordVerifier"}>
              <label htmlFor="inputPassword">
                <p>son mot de passe :</p>
                <p>(10 caractères minimum, avec au moins 1 chiffre, 1 lettre minuscule, 1 lettre majuscule et un caractère spécial (@, $, !, %, *, ?, ou &))</p>
                </label>
              <UIPasswordValidator inputRef={passwordRef} name="inputPassword" required/>
            </div>
            <button className={"light"} type={"submit"}>Créer sa guilde</button>
            {errMessage && <p>{errMessage}</p>}
            {isLoading && <LoadSpinner />}
        </>
        }
    </form>
  )
}

export default AdminSignupForm;