import SectionLeft from "@/components/SectionLeft";
import Style from "@/styles/components/landing/GreenSection.module.css";
import { PropsWithChildren } from "react";

type GreenSectionProps = PropsWithChildren<{
    id: string;
}>

/**
 * @returns la section verte de la page d'accueil
 */
const GreenSection = (props: GreenSectionProps): JSX.Element => {
    return (<section id={props.id} className={Style.GreenSection}>
        {props.children}
    </section>)
}

export default GreenSection;