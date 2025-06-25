'use client'
import { useState } from "react";
import WhiteSection from "./WhiteSection";
import SectionTitle from "../UI/SectionTitle";
import Style from "@/styles/components/landing/WhiteSection.module.css";
import Image from "next/image";
import Modal from "../UI/Modal";

const SeventhSection = (): JSX.Element => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <WhiteSection id={Style.SeventhSection}>
      <SectionTitle title={"leurs témoignages"} />
      <p className={Style.description}>Ils nous ont <span>fait confiance</span></p>
      <div className={Style.testimonialContainer}>
        <button id={Style.LinkToVideo} onClick={() => setShowVideo(true)}>
          <Image src={"/images/landing/desktop/play.svg"} alt={"play"} width={80} height={80} />
        </button>
        <div id={Style.testimonial}>
          <Image src={"/images/landing/desktop/cuma.webp"} alt={"cuma"} width={420 / 3} height={416 / 3} />
          <p><span>Nous avons testé Agriguilder</span> : l'application facilite vraiment la gestion des échanges de matériel et de travail. Nous l'avons adopté, et nous le recommandons à 100%.</p>
          <p><span>Découvrez notre retour d'expérience en vidéo !</span></p>
        </div>
      </div>

      <Modal isOpen={showVideo} onClose={() => setShowVideo(false)}>
        {/** importation d'une vidéo youtube */}
        <iframe width="560" height="315" src="https://www.youtube.com/embed/wHa3MFw5hPs?si=bgkEysEMwzELYKaX" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      </Modal>
    </WhiteSection>
  );
};

export default SeventhSection;
