'use client'

import LoadSpinner from "@/components/LoadSpinner";
import { FormEvent, useState } from "react"

const GodLogin = () => {
    const [godMail, setGodMail] = useState<string>("");
    const [godPassword, setGodPassword] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        console.log("godMail: ", godMail, "godPassword: ", godPassword);
        // si godMail est égal a la variable d'environnement NEXT_PUBLIC_SESSIONSTORAGE_GODMAIL
        if (godMail === process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODMAIL) {
            if (godPassword === process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODPASSWORD) {
                sessionStorage.setItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string, "true");
                // rediriger vers la page /god/data
                window.location.href = "/god/data";
            }
        }
        setIsSubmitting(false);
    }

    return (
        <section id={"godLogin"} className={"godSection"}>
            <h2>Connexion en tant que god :</h2>
            {isSubmitting ? <LoadSpinner/> : <form onSubmit={(event) => handleSubmit(event)}>
                <input 
                    type="email" 
                    name="godMailInput" 
                    id="godMailInput" 
                    aria-label="godMail" 
                    value={godMail}
                    onChange={(e) => setGodMail(e.target.value)}
                />
                <input 
                    type="password" 
                    name="godPasswordInput" 
                    id="godPasswordInput" 
                    aria-label="godPassword"
                    value={godPassword}
                    onChange={(e) => setGodPassword(e.target.value)}
                />
                <button className={"light"} type="submit">Se connecter</button>
            </form>}
        </section>
    )
}

export default GodLogin;