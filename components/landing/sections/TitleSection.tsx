import Style from "@/styles/pages/landing/TitleSection.module.css"
import LinkButton from "../UI/LinkButton"
import Image from "next/image"

const TitleSection = () => {
    return (<section id={Style.TitleSection}>
        <h1>Agriguilder.</h1>
        <p id={Style.heroText}>Une application numérique digitalisant la gestion des échanges de travail et de matériel entre les agriculteurs</p>
        <LinkButton color={'light'} text={"Découvrir"}/>
        <div id={Style.heroImage}>
            <Image
                src="/images/icons/logo-dark.png"
                alt="Hero Image"
                width={80}
                height={120}
            />
        </div>
    </section>)
}

export default TitleSection