import {useEffect, useState, useRef, FormEvent} from 'react'
import { UserName, ConnectedAdmin, UserMail, UserPhone } from '@/types'
import createMember from '@/tools/front/createMember';
import LoadSpinner from './LoadSpinner';
import UIEmailInput from './UI/UIEmailInput';
import UIFirstnameInput from './UI/UIFirstnameInput';
import UILastnameInput from './UI/UILastnameInput';
import UIPhoneInput from './UI/UIPhoneInput';
import UIButton from './UI/UIButton';

export type MemberSignupFormProps = {
    admin: ConnectedAdmin;
    onSignup: () => void;
}

const MemberSignupForm = (props: MemberSignupFormProps ) => {
    const [errMessage, setErrMessage] = useState<string>("");
    const [hasSignup, setHasSignup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const lastnameRef= useRef<HTMLInputElement>(null);
    const firstnameRef= useRef<HTMLInputElement>(null);
    const phoneRef= useRef<HTMLInputElement>(null);
    const mailRef= useRef<HTMLInputElement>(null);

    const handleSignup = async (event: FormEvent) => {
      event.preventDefault();
      setIsLoading(true);
      if (firstnameRef.current && lastnameRef.current && mailRef.current && phoneRef.current) {
        const name: UserName = `${firstnameRef.current.value} ${lastnameRef.current.value}`;
        const mail: UserMail = mailRef.current.value;
        const phone : UserPhone = phoneRef.current.value;
        const request = {name, mail, phone, guild: props.admin.guild};
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
    <form onSubmit={(event) => handleSignup(event)}>
        {hasSignup ? <>
          <p>L'inscription du nouveau membre a réussi ! il recevra un email de confirmation à l'adresse que vous avez renseignée.</p>
          <UIButton onClick={() => setHasSignup(false)}>Créer un autre membre</UIButton>
        </> : <>
          <label htmlFor="inputMail">Email du nouveau membre : (ex: jeandupont@gemail.net)</label>
          <UIEmailInput inputRef={mailRef} name="inputMail" required/>
          <label htmlFor="inputFirstName">Son prénom :</label>
          <UIFirstnameInput inputRef={firstnameRef} name="inputFirstName" required/>
          <label htmlFor="inputLaststName">Son nom de famille :</label>
          <UILastnameInput inputRef={lastnameRef} name="inputLastName" required/>
          <label htmlFor="inputPhone">Son numéro de tel :</label>
          <UIPhoneInput inputRef={phoneRef} name="inputPhone" required/>
          <p>A savoir : un email sera envoyé à l'adresse que vous aurez renseigné. Il contiendra les informations du membre, 
            dont un mot de passe généré aléatoirement, qu'il pourra personnaliser dès sa première connexion.</p>
          <UIButton type="submit">Inscrire le nouveau membre</UIButton>
          {errMessage && <p>{errMessage}</p>}
        </>
        }
        {isLoading && <LoadSpinner />}
    </form>
  )
}

export default MemberSignupForm;