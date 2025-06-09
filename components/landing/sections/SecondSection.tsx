import Image from "next/image";
import SectionTitle from "../UI/SectionTitle";
import WhiteSection from "./WhiteSection";
import Style from "@/styles/components/landing/WhiteSection.module.css";
import LinkButton from "../UI/LinkButton";

const SecondSection = ():JSX.Element => {
    return (
        <WhiteSection id={Style.SecondSection}>
            <div className={Style.leftPart}>
                <SectionTitle title={"A propos"} />
                <p className={Style.description}>
                    Une <span>solution</span> numérique & <span>innovente</span>.
                </p>
                <p className={Style.subText}>
                    Une application numérique qui permet aux <span>agriculteurs</span> de gérer <span>facilement</span> et efficacement leurs échanges de travail et de matériels
                </p>
                <LinkButton text={"Créer un compte"} color={"light"} />
            </div>
            <div className={Style.rightPart}>
                <Image
                    id={Style.mockupMobile}
                    src={"/images/landing/desktop/mockup_mobile.webp"}
                    alt={"mockup mobile"}
                    width={2580}
                    height={1964}
                />
            </div>
        </WhiteSection>
    )
}

export default SecondSection;