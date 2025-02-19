import {useState, useRef, FormEvent} from 'react'
import { UserName, ConnectedAdmin, UserMail, UserPhone, NewMemberInfos } from '@/types'
import createMember from '@/tools/front/createMember';
import LoadSpinner from './LoadSpinner';
import UIEmailInput from './UI/UIEmailInput';
import UISocietyNameInput from './UI/UISocietyNameInput';
import UIPhoneInput from './UI/UIPhoneInput';
import UICounterInput from './UI/UICounterInput';

export type MemberSignupFormProps = {
    admin: ConnectedAdmin;
    onSignup: () => void;
    onAbort: (bool: boolean) => void;
}

/**
 * @function MemberSignupForm
 * @description Composant pour un formulaire d'inscription d'un membre.
 * @param {MemberSignupFormProps} props - Les props du composant.
 * @param {ConnectedAdmin} props.admin - L'admin connecté.
 * @param {function} props.onSignup - La fonction à appeler après inscription.
 * @returns {JSX.Element} Un formulaire d'inscription d'un membre.
 */
const MemberSignupForm = (props: MemberSignupFormProps ) => {
    const [errMessage, setErrMessage] = useState<string>("");
    const [hasSignup, setHasSignup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const firstnameRef= useRef<HTMLInputElement>(null);
    const phoneRef= useRef<HTMLInputElement>(null);
    const mailRef= useRef<HTMLInputElement>(null);
    const initialCountRef= useRef<HTMLInputElement>(null);

    const handleSignup = async (event: FormEvent) => {
      event.preventDefault();
      setIsLoading(true);
      if (firstnameRef.current && mailRef.current && phoneRef.current && initialCountRef.current) {
        const name: UserName = firstnameRef.current.value;
        const mail: UserMail = mailRef.current.value;
        const phone : UserPhone = phoneRef.current.value;
        const initialCount: number = parseFloat(initialCountRef.current.value as string);
        const request: NewMemberInfos = {name, mail, phone, initialCount, guild: props.admin.guild};
        const response: Response | Error = await createMember(request, props.admin);
        if (response instanceof Response) {
          setIsLoading(false);
          setHasSignup(true);
          props.onSignup();
        }
        if (response instanceof Error) {
          setIsLoading(false);
          setErrMessage("Un problême à eu lieu lors de la création du compte. Veuillez vérifier si l'adresse mail que vous avez rentré est valide.")
        }
      }
    }

  return (
    <form id={"membersSignupForm"} onSubmit={(event) => handleSignup(event)}>
        {hasSignup ? <>
          <p>L'inscription du nouveau membre a réussi ! il recevra un email de confirmation à l'adresse que vous avez renseignée.</p>
          <button className={"light"} onClick={() => setHasSignup(false)}>Créer un autre membre</button>
        </> : <>
          <div className={"wrapper-horizontal"}>
            <div className={"wrapper-vertical"}>
              <label htmlFor="inputFirstName">Nom de la Société / raison sociale :</label>
              <UISocietyNameInput inputRef={firstnameRef} name="inputFirstName" required/>
            </div>
            <div className={"wrapper-vertical"}>
              <label htmlFor='inputInitialCount'>Valeur initiale de son compteur :</label>
              <UICounterInput inputRef={initialCountRef} name='inputInitialCount' required/>
            </div>
          </div>
          <div className={"wrapper-horizontal"}>
            <div className={"wrapper-vertical"}>
              <label htmlFor="inputMail">Son Email :</label>
              <UIEmailInput inputRef={mailRef} name="inputMail" required/>
            </div>
            <div className={"wrapper-vertical"}>
              <label htmlFor="inputPhone">Son numéro de tel :</label>
              <UIPhoneInput inputRef={phoneRef} name="inputPhone" required/>
            </div>
          </div>
          <p id={"toKnow"}>A savoir : un email sera envoyé à l'adresse que vous aurez renseigné. Il contiendra un mot de passe généré aléatoirement, qui sera personnalisable dès sa première connexion.</p>
          <div className={"wrapper-horizontal"}>
            <button className={"light"} type="submit">Créer le membre</button>
            <button className={"green"} onClick={() => props.onAbort(false)}>Annuler</button>
          </div>
          {errMessage && <p className={"formErrorMsg"}>{errMessage}</p>}
        </>}
        {isLoading && <LoadSpinner />}
    </form>
  )
}

export default MemberSignupForm;