import Style from "@/styles/pages/landing/TitleSection.module.css"
import LinkButton from "../UI/LinkButton"

const TitleSection = () => {
    return (<section id={Style.TitleSection}>
        <h1>Agriguilder.</h1>
        <p>Une application numérique digitalisant la gestion des échanges de travail et de matériel entre les agriculteurs</p>
        <LinkButton color={'light'} text={"Découvrir"}/>
    </section>)
}

export default TitleSection