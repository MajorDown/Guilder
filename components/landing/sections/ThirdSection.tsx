
import SectionTitle from "../UI/SectionTitle";
import GreenSection from "./GreenSection";
import Style from "@/styles/components/landing/GreenSection.module.css";

/**
 * @returns la section verte de la page d'accueil
 */
const ThirdSection = (): JSX.Element => {
    return (
        <GreenSection id={Style.ThirdSection}>
            <div id={Style.titleWrapper}>
                <SectionTitle title={"Nos avantages"} />
                <p id={Style.subTitle}>Pourquoi <span>utiliser</span> Agriguilder ?</p>
                <div className={Style.sectionContainer}>
                    <div id={Style.first}>
                        <h3>Un accès <span>Personnalisé</span></h3>
                        <p>Chaque adhérent possède un accès personnalisé via un site internet</p>
                    </div>
                    <div id={Style.second}>
                        <h3>Déclaration <span>instantanée</span></h3>
                        <p>Echange de temps et d'interventions réalisés entre membres</p>
                    </div>
                    <div id={Style.third}>
                        <h3>Mises à jour <span>automatiques</span></h3>
                        <p>Historique des échanges et des soldes de points</p>
                    </div>
                </div>
            </div>
        </GreenSection>
    );
}
export default ThirdSection;