import {useEffect, useState} from 'react'
import { UserMail, UserPassword } from '@/types'

const loginForm = () => {
    const [mail, setmail] = useState<UserMail>("");
    const [password, setPassword] = useState<UserPassword>("");
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
        <label htmlFor="inputPassword"> Votre mot de passe :</label>
        <input type="password" name="password" id="inputPassword" value={password} onChange={(event) => setPassword(event.target.value)} required/>
        {errMessage && <p>{errMessage}</p>}
        <button type="submit"></button>
    </form>
  )
}

export default loginForm;