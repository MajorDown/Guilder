'use client'
import Link from 'next/link';
import { FormEvent, useState, useRef } from 'react';
import connectAdmin from '@/tools/front/connectAdmin';
import { useRouter } from 'next/navigation';
import { useAdminContext } from '@/contexts/adminContext';
import UIEmailInput from './UI/UIEmailInput';
import UIPasswordInput from './UI/UIPasswordInput';
import UIButton from './UI/UIButton';
import LoadSpinner from './LoadSpinner';

/**
 * Composant pour un formulaire de connexion d'administrateur.
 *
 * @returns {JSX.Element} Un formulaire de connexion d'admin.
 */
const AdminLoginForm = () => {
  const router = useRouter();
  const { updateAdmin } = useAdminContext();
  const [errMessage, setErrMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setErrMessage("Mail / mot de passe incorrect !");
    } else {
      // L'authPersistence vient de la BDD (non modifiable ici)
      const storageKey = process.env.NEXT_PUBLIC_LOCALSTORAGE_ADMINCONTEXT_KEY as string;
      if (response.authPersistence) {
        localStorage.setItem(storageKey, JSON.stringify(response));
      } else {
        sessionStorage.setItem(storageKey, JSON.stringify(response));
      }
      updateAdmin(response);
      setIsLoading(false);
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <UIEmailInput aria-label={"mail"} inputRef={mailRef} name="inputMail" required />
      <UIPasswordInput aria-label={"password"} inputRef={passwordRef} name="inputPassword" required />

      <UIButton type="submit">Se Connecter en tant qu'admin</UIButton>
      <Link href="/lostPassword">Mot de passe oublié ?</Link>      

      {isLoading && (
        <>
          <p>Chargement des données utilisateurs... veuillez patienter</p>
          <LoadSpinner />
        </>
      )}

      {errMessage && <p className={"formErrorMsg"}>{errMessage}</p>}
    </form>
  );
};

export default AdminLoginForm;
