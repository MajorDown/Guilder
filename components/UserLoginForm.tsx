'use client'
import {FormEvent, useState, useRef} from 'react';
import connectUser from '@/tools/front/connectUser';
import { useRouter } from 'next/navigation'; 
import { useUserContext } from '@/contexts/userContext';
import { useGuildContext } from '@/contexts/guildContext';
import UIEmailInput from './UI/UIEmailInput';
import UIPasswordInput from './UI/UIPasswordInput';
import UIButton from './UI/UIButton';
import LoadSpinner from './LoadSpinner';
import { getGuildMembers } from '@/tools/front/getGuildMembers';

/**
 * Composant pour un formulaire de connexion d'utilisateur.
 *
 * @returns {JSX.Element} Un formulaire de connexion d'administrateur.
 */
const UserLoginForm = () => {
  const router = useRouter()
  const {updateUser} = useUserContext();
  const {updateMembers} = useGuildContext();
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
    const response = await connectUser(request);
    if (response instanceof Error) {
      setIsLoading(false);
      setErrMessage("mail / mot de passe incorrect"!)
    }
    else {
      localStorage.setItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_USERCONTEXT_KEY as string, JSON.stringify(response));
      updateUser(response);
      const guildMembers = await getGuildMembers(response.guild, response.token);
      localStorage.setItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_GUILDCONTEXT_KEY as string, JSON.stringify(guildMembers));
      updateMembers(guildMembers);
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
      <UIButton type="submit">Se connecter en tant que membre</UIButton>
      {isLoadIng && <>
        <p>chargement des données utilisateurs... veuillez patienter</p>
        <LoadSpinner />
      </>}
      {errMessage && <p>{errMessage}</p>}
    </form>
  )
}

export default UserLoginForm;