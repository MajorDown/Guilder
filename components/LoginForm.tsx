import {FormEvent, useEffect, useState} from 'react';
import { UserMail, UserPassword } from '@/types';
import connectUser from '@/tools/front/connectUser';

const LoginForm = () => {
    const [mail, setmail] = useState<UserMail>("");
    const [password, setPassword] = useState<UserPassword>("");
    const [errMessage, setErrMessage] = useState<string>("");

    useEffect(() => {
    }, [mail, password])

    const handleLogin = async (event: FormEvent) => {
      event.preventDefault();
        console.log("handleLogin");
        const request = {mail, password};
        const response = await connectUser(request);
        console.log(response);
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