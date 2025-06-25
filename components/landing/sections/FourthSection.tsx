import Image from "next/image";
import SectionTitle from "../UI/SectionTitle";
import WhiteSection from "./WhiteSection";
import Style from "@/styles/components/landing/WhiteSection.module.css";
import LinkButton from "../UI/LinkButton";

const FourthSection = ():JSX.Element => {
    return (
        <WhiteSection id={Style.FourthSection}>
            <div className={Style.leftPart}>
                <div id={Style.contactUsImage}></div>
                <LinkButton text={"Nous Contacter"} color={"light"} />
            </div>
            <div className={Style.rightPart}>
                <SectionTitle title={"Nos Bénéfices"} />
                <p className={Style.description}>
                    Optimisez votre <span>temps</span> & votre<span> trésorerie</span>.
                </p>
                <ol>
                    <li>Simplifiez et numérisez la gestion de vos échanges</li>
                    <li>Optimisez votre temps ainsi que votre trésorerie</li>
                    <li>Bénéfice d'une banque de travail équitable & réactive</li>
                </ol>
            </div>
        </WhiteSection>
    )
}

export default FourthSection;