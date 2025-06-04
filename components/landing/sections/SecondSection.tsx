import Image from "next/image";
import SectionTitle from "../UI/SectionTitle";
import WhiteSection from "./WhiteSection";
import Style from "@/styles/components/landing/SecondSection.module.css";

const SecondSection = ():JSX.Element => {
    return (
        <WhiteSection
            left={<>
                <SectionTitle title={"Second Section"} />
            </>}
            right={<>
                <Image
                    id={Style.mockupMobile}
                    src={"/images/landing/desktop/mockup_mobile.webp"}
                    alt={"mockup mobile"}
                    width={2580/2}
                    height={1964/2}
                />
            </>}
        />
    )
}

export default SecondSection;