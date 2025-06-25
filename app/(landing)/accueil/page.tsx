import FourthSection from "@/components/landing/sections/FourthSection";
import SecondSection from "@/components/landing/sections/SecondSection";
import ThirdSection from "@/components/landing/sections/ThirdSection";
import TitleSection from "@/components/landing/sections/TitleSection";
import FifthSection from "@/components/landing/sections/FifthSection";
import SixthSection from "@/components/landing/sections/SixthSection";
import SeventhSection from "@/components/landing/sections/SeventhSection";
import LastSection from "@/components/landing/sections/LastSection";

const Accueil = (): JSX.Element => {
    return (<>
        <TitleSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <SixthSection />
        <SeventhSection />
        <LastSection />
    </>)
}

export default Accueil;