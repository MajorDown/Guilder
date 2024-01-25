'use client'
import {FormEvent, useState, useRef} from 'react';
import connectAdmin from '@/tools/front/connectAdmin';
import { useRouter } from 'next/navigation'; 
import { useAdminContext } from '@/contexts/adminContext';
import LoadSpinner from './LoadSpinner';
import UIEmailInput from './UI/UIEmailInput';
import UIPasswordInput from './UI/UIPasswordInput';
import UIButton from './UI/UIButton';

const AdminLoginForm = () => {
  const router = useRouter()
  const {updateAdmin} = useAdminContext();
  const [errMessage, setErrMessage] = useState<string>("");
  const [isLoadIng, setIsLoading] = useState<boolean>(false);

  const mailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (event: FormEvent) => {
      setIsLoading(true);
      event.preventDefault();
      const request = {
        mail: mailRef.current?.value,
        password: passwordRef.current?.value
      };
      const response = await connectAdmin(request);
      if (response instanceof Error) {
        setIsLoading(false);
        setErrMessage("mail / mot de passe incorrect"!)
      }
      else {
        localStorage.setItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_ADMINCONTEXT_KEY as string, JSON.stringify(response));
        updateAdmin(response);
        setIsLoading(false);
        router.push("/")
      }
    }

  return (
    <form onSubmit={(event) => handleLogin(event)}>
        <label htmlFor="inputMail">Votre Email :</label>
        <UIEmailInput inputRef={mailRef} name="inputMail" required/>
        <label htmlFor="inputPassword"> Votre mot de passe :</label>
        <UIPasswordInput inputRef={passwordRef} name="inputPassword" required/>
        <UIButton type="submit">Se Connecter</UIButton>
        {isLoadIng && <>
          <p>chargement des données utilisateurs... veuillez patienter</p>
          <LoadSpinner />
        </>}
        {errMessage && <p>{errMessage}</p>}
    </form>
  )
}

export default AdminLoginForm;
