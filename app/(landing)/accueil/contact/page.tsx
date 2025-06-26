'use client'
import { useRef, FormEvent } from "react";
import UIFirstnameInput from "@/components/UI/UIFirstnameInput";
import UILastnameInput from "@/components/UI/UILastnameInput";
import UIEmailInput from "@/components/UI/UIEmailInput";
import UIPhoneInput from "@/components/UI/UIPhoneInput";
import UIButton from "@/components/UI/UIButton";
import Style from "@/styles/components/landing/ContactSection.module.css";
import { useRouter } from "next/navigation";

const ContactPage = () => {
    const router = useRouter();
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const formResult = {
            firstname: firstnameRef.current?.value,
            lastname: lastnameRef.current?.value,
            email: emailRef.current?.value,
            phone: phoneRef.current?.value,
            message: messageRef.current?.value,
        };
        console.log("Form submitted:", formResult);
        alert("Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.");
        router.refresh();
    };

    return (<section id={Style.ContactSection}>
        <h2>Vous souhaitez en savoir plus ?</h2>
        <p>Contactez-nous pour toute question ou information complémentaire.</p>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Votre prénom :</label>
                <UIFirstnameInput inputRef={firstnameRef} aria-label="Votre prénom :" required />
            </div>
            <div>
                <label>Votre nom :</label>
                <UILastnameInput inputRef={lastnameRef} aria-label={"Votre nom :"} required />
            </div>
            <div> 
                <label>Votre adresse e-mail :</label>        
                <UIEmailInput inputRef={emailRef} aria-label={"Votre adresse e-mail :"} required />
            </div>
            <div> 
                <label htmlFor="phone">Votre numéro de téléphone :</label>              
                <UIPhoneInput inputRef={phoneRef} aria-label={"Votre numéro de téléphone :"} required/>
            </div>
            <div id={Style.message}>
                <label htmlFor="message">Votre Message</label>
                <textarea ref={messageRef} id="message" name="message" rows={8} cols={50} required></textarea>
            </div>
            <UIButton type="submit">Envoyer</UIButton>
        </form>
    </section>)
}

export default ContactPage;