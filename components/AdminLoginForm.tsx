'use client'
import {FormEvent, useState} from 'react';
import { UserMail, UserPassword } from '@/types';
import connectAdmin from '@/tools/front/connectAdmin';
import { useRouter } from 'next/navigation'; 
import { useAdminContext } from '@/contexts/adminContext';
import LoadSpinner from './LoadSpinner';

const AdminLoginForm = () => {
  const router = useRouter()
  const {updateAdmin} = useAdminContext();
  const [mail, setmail] = useState<UserMail>("");
  const [password, setPassword] = useState<UserPassword>("");
  const [errMessage, setErrMessage] = useState<string>("");
  const [isLoadIng, setIsLoading] = useState<boolean>(false);

    const handleLogin = async (event: FormEvent) => {
      setIsLoading(true);
      event.preventDefault();
      const request = {mail, password};
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
        <input type="email" name="mail" id="inputMail" value={mail} onChange={(event) => setmail(event.target.value)} required/>
        <label htmlFor="inputPassword"> Votre mot de passe :</label>
        <input type="password" name="password" id="inputPassword" value={password} onChange={(event) => setPassword(event.target.value)} required/>
        {errMessage && <p>{errMessage}</p>}
        <button type="submit">Se Connecter en tnt qu'admin</button>
        {isLoadIng && <>
          <p>chargement des données utilisateur... veuillez patienter</p>
          <LoadSpinner />
        </>
        }
    </form>
  )
}

export default AdminLoginForm;