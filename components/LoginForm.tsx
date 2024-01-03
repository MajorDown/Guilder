import {FormEvent, useState} from 'react';
import { UserMail, UserPassword } from '@/types';
import connectUser from '@/tools/front/connectUser';
import { useRouter } from 'next/navigation'; 
import { useUserContext } from '@/contexts/userContext';
import { useGuildContext } from '@/contexts/guildContext';
import LoadSpinner from './LoadSpinner';
import { getGuildMembers } from '@/tools/front/getGuildMembers';

const LoginForm = () => {
  const router = useRouter()
  const {updateUser} = useUserContext();
  const {updateMembers} = useGuildContext();
    const [mail, setmail] = useState<UserMail>("");
    const [password, setPassword] = useState<UserPassword>("");
    const [errMessage, setErrMessage] = useState<string>("");
    const [isLoadIng, setIsLoading] = useState<boolean>(false);

    const handleLogin = async (event: FormEvent) => {
      setIsLoading(true);
      event.preventDefault();
      const request = {mail, password};
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
        <input type="email" name="mail" id="inputMail" value={mail} onChange={(event) => setmail(event.target.value)} required/>
        <label htmlFor="inputPassword"> Votre mot de passe :</label>
        <input type="password" name="password" id="inputPassword" value={password} onChange={(event) => setPassword(event.target.value)} required/>
        {errMessage && <p>{errMessage}</p>}
        <button type="submit">Se Connecter</button>
        {isLoadIng && <>
          <p>chargement des données utilisateur... veuillez patienter</p>
          <LoadSpinner />
        </>
        }
    </form>
  )
}

export default LoginForm;