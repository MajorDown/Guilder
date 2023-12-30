import {FormEvent, useState} from 'react';
import { UserMail, UserPassword } from '@/types';
import connectUser from '@/tools/front/connectUser';
import { useRouter } from 'next/navigation'; 
import { useUserContext } from '@/contexts/userContext';

const LoginForm = () => {
  const router = useRouter()
  const {user, updateUser} = useUserContext();
    const [mail, setmail] = useState<UserMail>("");
    const [password, setPassword] = useState<UserPassword>("");
    const [errMessage, setErrMessage] = useState<string>("");

    const handleLogin = async (event: FormEvent) => {
      event.preventDefault();
        const request = {mail, password};
        const response = await connectUser(request);
        if (response instanceof Error) setErrMessage("mail / mot de passe incorrect"!)
        else {
          localStorage.setItem(process.env.LOCALSTORAGE_USERCONTEXT_KEY as string, JSON.stringify(response));
          updateUser(response);
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
    </form>
  )
}

export default LoginForm;