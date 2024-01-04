import {useEffect, useState, FormEvent} from 'react'
import { UserMail, UserName, UserPhone, UserPassword, Guild } from '@/types'
import createUser from '@/tools/front/createUser';
import LoadSpinner from './LoadSpinner';

const SignupForm = () => {
    const [mail, setMail] = useState<UserMail>("");
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [phone, setPhone] = useState<UserPhone>("");
    const [guild, setGuild] = useState<Guild>("");
    const [password, setPassword] = useState<UserPassword>("");
    const [passwordConfirm, setPasswordConfirm] = useState<UserPassword>("");
    const [errMessage, setErrMessage] = useState<string>("");
    const [hasSignup, setHasSignup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
      if (password && passwordConfirm && password != passwordConfirm) setErrMessage("les mots de passes sont différents !");
      else setErrMessage("");
    }, 
    [password, passwordConfirm])

    const handleSignup = async (event: FormEvent) => {
      event.preventDefault();
      setIsLoading(true);
      const name: UserName = `${firstName} ${lastName}`
      const request = {mail, name, password, phone, guild};
      const response: Response | Error = await createUser(request);
      if (response instanceof Response) {
        setIsLoading(false);
        setHasSignup(true);
        setFirstName("");
        setLastName("");
        setMail("");
        setPhone("");
        setGuild("");
        setPassword("");
        setPasswordConfirm("")
      }
      if (response instanceof Error) {
        setIsLoading(false);
        setErrMessage('Un problême à eu lieu lors de votre inscription. Veuillez réessayer plus tard.')
      };
  }  

  return (
    <form onSubmit={(event) => handleSignup(event)}>
        {hasSignup ? <p>
          Votre inscription a réussi. Bienvenue ! vous pouvez maintenant vous connecter
          </p> : <>
        <label htmlFor="inputMail">Votre Email :</label>
        <input type="email" name="mail" id="inputMail" value={mail} onChange={(event) => setMail(event.target.value)} required/>
        <label htmlFor="inputFirstName">Votre prénom : (ex: Jean)</label>
        <input type="text" name="firstname" id="inputFirstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} required/>
        <label htmlFor="inputLaststName">Votre nom de famille : (ex: Dupont)</label>
        <input type="text" name="firstname" id="inputLastName" value={lastName} onChange={(event) => setLastName(event.target.value)} required/>
        <label htmlFor="inputPhone">Votre numéro de tel :</label>
        <input type="text" pattern="[0-9]{10}" name="phone" id="inputPhone" value={phone} onChange={(event) => setPhone(event.target.value)} required/>
        <label htmlFor="inputGuild">
          <p>Quel est le nom de la guilde que vous souhaitez intégrer ?</p>
          <p>(n'hésitez pas à demander aux autres membres si vous ne l'avez pas encore)</p>
        </label>
        <input type="text" name="guild" id="inputGuild" value={guild} onChange={(event) => setGuild(event.target.value)} required/>     
        <label htmlFor="inputPassword">Votre mot de passe : (pensez à ne pas le faire trop simple)</label>
        <input type="password" name="password" id="inputPassword" value={password} onChange={(event) => setPassword(event.target.value)} required/>
        <label htmlFor="inputPassword">Confirmer votre mot de passe :</label>
        <div className="inputWrapper">
          <input type="password" name="passwordConfirm" id="inputPasswordConfirm" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required/>
          {errMessage && <p>{errMessage}</p>}
        </div>
        <button type="submit">S'inscrire</button>
        {isLoading && <LoadSpinner />}
        </>
        }
    </form>
  )
}

export default SignupForm;