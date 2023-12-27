import {FormEvent, useState} from 'react';
import { UserMail, UserPassword } from '@/types';
import connectUser from '@/tools/front/connectUser';
import { useUserContext } from '@/contexts/userContext';

const LoginForm = () => {
    const UserContext = useUserContext();
    const [mail, setmail] = useState<UserMail>("");
    const [password, setPassword] = useState<UserPassword>("");
    const [errMessage, setErrMessage] = useState<string>("");

    const handleLogin = async (event: FormEvent) => {
      event.preventDefault();
        console.log("handleLogin");
        const request = {mail, password};
        const response = await connectUser(request);
        console.log(response);
        if (!(response instanceof Error)) {
          UserContext?.updateUser({
            name: response.name,
            mail: response.mail,
            phone: response.phone,
            counter: response.counter,
            guild: response.guild
          })
          localStorage.setItem("guilder_token", response.token);
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