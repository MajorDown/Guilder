'use client'
import { useRef, useLayoutEffect } from 'react'
import SectionTitle from "../UI/SectionTitle";
import Style from "@/styles/components/landing/GreenSection.module.css";
import GreenSection from "./GreenSection";

/**
 * @returns la section des avantages de l'application
 */
const ThirdSection = (): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (container) {
            const scrollWidth = container.scrollWidth;
            const visibleWidth = container.clientWidth;
            const scrollLeft = (scrollWidth - visibleWidth) / 2;
            container.scrollLeft = scrollLeft;
        }
    }, []);

    return (
        <GreenSection id={Style.ThirdSection}>
            <div id={Style.titleWrapper}>
                <SectionTitle title={"Nos avantages"} />
                <p id={Style.subTitle}>Pourquoi <span>utiliser</span> Agriguilder ?</p>
            </div>
            <div className={Style.sectionContainer} ref={containerRef}>
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
        </GreenSection>
    );
};

export default ThirdSection;
