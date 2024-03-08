'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import UILink from "@/components/UI/UILink";

/**
 * @module Home
 */
const Concept = () => {
    const conceptLines = [
        "En tant que membre de votre guilde, vous pouvez déclarer une intervention que vous aurez réalisée pour un autre membre.",
        "En déclarant une intervention, votre compteur de points augmente en fonction de la nature de l'intervention, ainsi que le nombre d'heures effectuées.",
        "Le membre qui aura bénéficié de votre intervention, quand à lui, verra son compteur de points diminuer de la même valeur.",
        "Ce système, sollicité à l'origine par un collectif agricole, vise à péréniser et équilibrer l'entraide entre chaque membre."
    ];

    const [line, setLine] = useState<0 | 1 | 2 |3>(0);

    const handleNextLine = () => {
        if (line === 0) setLine(1);
        if (line === 1) setLine(2);
        if (line === 2) setLine(3);
        if (line === 3) setLine(0);
    }
    
    return (
        <section id={"section_accueil"}>
            <h2>Le concept est simple</h2>
            <div id={"accueil_concept"}>
                <p>{conceptLines[line]}</p>
                <div id={"lineNav"}>
                    <div id={"lineSelector"}>
                        <Image src={`/images/icons/${line === 0 ? 'checked' : 'unchecked'}.svg`} alt={"line"} width={10} height={10} onClick={() => setLine(0)}/>
                        <Image src={`/images/icons/${line === 1 ? 'checked' : 'unchecked'}.svg`} alt={"line"} width={10} height={10} onClick={() => setLine(1)}/>
                        <Image src={`/images/icons/${line === 2 ? 'checked' : 'unchecked'}.svg`} alt={"line"} width={10} height={10} onClick={() => setLine(2)}/>
                        <Image src={`/images/icons/${line === 3 ? 'checked' : 'unchecked'}.svg`} alt={"line"} width={10} height={10} onClick={() => setLine(3)}/>
                    </div>
                    <Image src={"/images/icons/arrow-white-right.svg"} alt={"en savoir plus"} width={30} height={30} onClick={() => handleNextLine()}/>
                </div>
            </div>
            <div id={"accueil_navigation"}>
                <UILink color={"green"} href={"/inscription"}>
                    <Image src={"/images/icons/guilde-white-dark.svg"} alt={"creer sa guilde"} width={30} height={30}/>
                    <p>Créer sa guilde</p>
                </UILink>
                <UILink color={"dark"} href={"/connexion"}>
                    <Image src={"/images/icons/membre-white-dark.svg"} alt={"se connecter"} width={30} height={30}/>
                    <p>Se Connecter</p>
                </UILink>
            </div>
        </section>
    )
}

export default Concept;