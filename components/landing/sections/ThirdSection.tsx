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
            </div>
        </GreenSection>
    );
}
export default ThirdSection;