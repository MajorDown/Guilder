'use client'
import AdminSignupForm from "@/components/AdminSignupForm";
import { useEffect } from "react";

const GodInscription = () => {

    useEffect(() => {
        if (sessionStorage.getItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string) !== "true") {
            // rediriger vers la page /god/login
            window.location.href = "/god/login";
        }
    }, []);

    return (
        <section id={"godInscription"} className={"godSection"}>
            <h2>Inscription d'une nouvelle guilde</h2>
            <AdminSignupForm />
        </section>
    )
}

export default GodInscription;