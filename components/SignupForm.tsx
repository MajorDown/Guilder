import {useEffect, useState} from 'react'
import { UserMail, UserName, UserPhone, UserPassword, Guild } from '@/types'

const LoginForm = () => {
    const [mail, setmail] = useState<UserMail>("");
    const [name, setName] = useState<UserName>("");
    const [phone, setPhone] = useState<UserPhone>();
    const [guild, setGuild] = useState<Guild>("");
    const [password, setPassword] = useState<UserPassword>("");
    const [passwordConfirm, setPasswordConfirm] = useState<UserPassword>("");
    const [errMessage, setErrMessage] = useState<string>("");

    useEffect(() => {
    }, [mail, password])

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
        <input type="number" name="phone" id="inputPhone" value={phone} onChange={(event) => setPhone(event.target.value)} required/>
        <label htmlFor="inputPassword"> Votre mot de passe :</label>
        <input type="password" name="password" id="inputPassword" value={password} onChange={(event) => setPassword(event.target.value)} required/>
        {errMessage && <p>{errMessage}</p>}
        <button type="submit"></button>
    </form>
  )
}

export default LoginForm;