import Image from "next/image";
import Style from "@/styles/components/landing/SectionTitle.module.css";

type SectionTitleProps = {
    title: string
}

const SectionTitle = (props: SectionTitleProps):JSX.Element => {
    return (<div className={Style.SectionTitle}>
        <h2>{props.title}</h2>
        <Image
            src={"/images/landing/desktop/flower_light.webp"}
            alt={"title icon"}
            width={60}
            height={35}
        />
    </div>)
}

export default SectionTitle;