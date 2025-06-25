import LinkButton from "../UI/LinkButton";
import Style from "@/styles/components/landing/LastSection.module.css";

const LastSection = ():JSX.Element => {
    return (<section id={Style.LastSection}>
        <p id={Style.conclusion}>Devenez membre de la communauté <span>Agriguilder</span> pour <span>simplifier</span> votre quotidien.</p>
        <LinkButton text={"Découvrir l'outils"} color={"white"} />
    </section>)
}

export default LastSection;