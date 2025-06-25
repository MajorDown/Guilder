'use client'
import {FormEvent, useState, useRef} from 'react';
import connectMember from '@/tools/front/connectMember';
import { useRouter } from 'next/navigation'; 
import { useMemberContext } from '@/contexts/memberContext';
import UIEmailInput from './UI/UIEmailInput';
import UIPasswordInput from './UI/UIPasswordInput';
import UIButton from './UI/UIButton';
import LoadSpinner from './LoadSpinner';
import Link from 'next/link';

/**
 * Composant pour un formulaire de connexion d'utilisateur.
 *
 * @returns {JSX.Element} Un formulaire de connexion d'administrateur.
 */
const UserLoginForm = () => {
  const router = useRouter()
  const {updateMember} = useMemberContext();
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
    const response = await connectMember(request);
    if (response instanceof Error) {
      setIsLoading(false);
      setErrMessage("mail / mot de passe incorrect"!)
    }
    else {
      localStorage.setItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_MEMBERCONTEXT_KEY as string, JSON.stringify(response));
      updateMember(response);
      setIsLoading(false);
      router.push("/")
    }
  }

  return (
    <form onSubmit={(event) => handleLogin(event)}>
      <UIEmailInput aria-label={"mail"} inputRef={mailRef} name="inputMail" required/>
      <UIPasswordInput aria-label={"password"} inputRef={passwordRef} name="inputPassword" required/>
      <UIButton type="submit">Se connecter en tant que membre</UIButton>
      <Link href="/lostPassword">Mot de passe oublié ?</Link>
      {isLoadIng && <>
        <p>chargement des données utilisateurs... veuillez patienter</p>
        <LoadSpinner />
      </>}
      {errMessage && <p className={"formErrorMsg"}>{errMessage}</p>}
    </form>
  )
}

export default UserLoginForm;