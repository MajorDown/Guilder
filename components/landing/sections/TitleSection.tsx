import Style from "@/styles/components/landing/TitleSection.module.css"
import LinkButton from "../UI/LinkButton"
import Image from "next/image"

/**
 * @returns la section d'accueil du site
 */
const TitleSection = () => {
    return (<section id={Style.TitleSection}>
        <h1>Agriguilder.</h1>
        <p 
            id={Style.heroText}
        >
            <span>Une application numérique</span> digitalisant la gestion 
            des échanges de travail et de matériel entre <span>les agriculteurs</span>
        </p>
        <LinkButton color={'light'} text={"Découvrir"}/>
        <div id={Style.heroImage}>
            <Image
                id={Style.heroLogo}
                src="/images/icons/logo-dark.png"
                alt="Hero Image"
                width={80}
                height={120}
            />
            <Image
                id={Style.arrowDown}
                src="/images/icons/arrow_down_white.png"
                alt="Hero Image"
                width={24}
                height={24}
            />
        </div>
    </section>)
}

export default TitleSection