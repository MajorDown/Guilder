'use client'
import { useState } from "react";
import WhiteSection from "./WhiteSection";
import SectionTitle from "../UI/SectionTitle";
import Style from "@/styles/components/landing/WhiteSection.module.css";
import Image from "next/image";
import Modal from "../UI/Modal";
import Link from "next/link";

const SeventhSection = (): JSX.Element => {

  return (
    <WhiteSection id={Style.SeventhSection}>
      <SectionTitle title={"leurs témoignages"} />
      <p className={Style.description}>Ils nous ont <span>fait confiance</span></p>
      <div className={Style.testimonialContainer}>
        <Link id={Style.LinkToVideo} href={`/accueil/wHa3MFw5hPs?si=bgkEysEMwzELYKaX`}>
          <Image src={"/images/landing/desktop/play.svg"} alt={"play"} width={80} height={80} />
        </Link>
        <div id={Style.testimonial}>
          <Image src={"/images/landing/desktop/cuma.webp"} alt={"cuma"} width={420 / 3} height={416 / 3} />
          <p><span>Nous avons testé Agriguilder</span> : l'application facilite vraiment la gestion des échanges de matériel et de travail. Nous l'avons adopté, et nous le recommandons à 100%.</p>
          <p><span>Découvrez notre retour d'expérience en vidéo !</span></p>
        </div>
      </div>
    </WhiteSection>
  );
};

export default SeventhSection;
