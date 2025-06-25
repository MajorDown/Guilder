'use client'
import { useRef, useLayoutEffect } from 'react'
import Image from "next/image";
import Style from "@/styles/components/landing/GreenSection.module.css";
import GreenSection from "./GreenSection";

/**
 * @returns la section des avantages de l'application
 */
const FifthSection = (): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <GreenSection id={Style.FifthSection}>
            <Image
                id={Style.quoteImage}
                src={'/images/landing/desktop/quote-dark.png'} 
                alt={"Témoignages"}
                width={100}
                height={61} 
            />
            <div id={Style.commentsContainer} ref={containerRef}>
                <div id={Style.firstComment}>
                    <Image 
                        src={'/images/landing/mobile/testimony_1.webp'} 
                        alt={'premier témoignage'}
                        width={150}
                        height={150}
                    />
                    <p>" On a aucun suivi, tout est dans un vieux cahier ou dans nos têtes. "</p>
                </div>
                <div id={Style.secondComment}>
                    <Image 
                        src={'/images/landing/mobile/testimony_2.webp'} 
                        alt={'second témoignage'}
                        width={150}
                        height={150} 
                    />
                    <p>" Je ne sais jamais où j'en suis dans mes heures. "</p>
                </div>
                <div id={Style.thirdComment}>
                    <Image 
                        src={'/images/landing/mobile/testimony_3.webp'} 
                        alt={'troisième témoignage'}
                        width={150}
                        height={150}
                    />
                    <p>" Certains font plus que d'autres, et ça ne se voit même pas. "</p>
                </div>
            </div>
        </GreenSection>
    );
};

export default FifthSection;
