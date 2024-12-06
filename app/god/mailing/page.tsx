'use client'
import { useEffect } from "react";

const GodMailing = () => {

    useEffect(() => {
        if (sessionStorage.getItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string) !== "true") {
            // rediriger vers la page /god/login
            window.location.href = "/god/login";
        }
    }, []);

    return (
        <section id={"godMailing"} className={"godSection"}>
            <h2>Envoi de mail</h2>
        </section>
    )
}

export default GodMailing;