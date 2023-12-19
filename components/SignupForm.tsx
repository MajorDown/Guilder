import {useEffect, useState} from 'react'
import { UserMail, UserName, UserPhone, UserPassword, Guild } from '@/types'

const SignupForm = () => {
    const [mail, setmail] = useState<UserMail>("");
    const [name, setName] = useState<UserName>("");
    const [phone, setPhone] = useState<UserPhone>();
    const [guild, setGuild] = useState<Guild>("");
    const [password, setPassword] = useState<UserPassword>("");
    const [passwordConfirm, setPasswordConfirm] = useState<UserPassword>("");
    const [errMessage, setErrMessage] = useState<string>("");

    useEffect(() => {
      if (password && passwordConfirm && password != passwordConfirm) setErrMessage("les mots de passes rentrés sont différents !");
    }, 
    [password, passwordConfirm])

    useEffect(() => {
    }, [mail, password, passwordConfirm, phone, guild])

    const handleConnect = () => {
        console.log("handleConnect");
    }

  return (
    <form onSubmit={() => handleConnect()}>
        <label htmlFor="inputMail">Votre Email :</label>
        <input type="email" name="mail" id="inputMail" value={mail} onChange={(event) => setmail(event.target.value)} required/>
        <label htmlFor="inputName">Votre nom :</label>
        <input type="text" name="name" id="inputName" value={name} onChange={(event) => setName(event.target.value)} required/>
        <label htmlFor="inputPhone">Votre numéro de tel :</label>
        <input type="number" name="phone" id="inputPhone" value={phone} onChange={(event) => setPhone(parseInt(event.target.value, 10))} required/>
        <label htmlFor="inputPassword">Votre mot de passe :</label>
        <input type="password" name="password" id="inputPassword" value={password} onChange={(event) => setPassword(event.target.value)} required/>
        <label htmlFor="inputPassword">Confirmer votre mot de passe :</label>
        <input type="password" name="passwordConfirm" id="inputPasswordConfirm" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required/>
        {errMessage && <p>{errMessage}</p>}
        <button type="submit">S'inscrire</button>
    </form>
  )
}

export default SignupForm;