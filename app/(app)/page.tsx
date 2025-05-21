'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UILink from "@/components/UI/UILink";
import { useAdminContext} from "@/contexts/adminContext";
import { useMemberContext } from "@/contexts/memberContext";

/**
 * @module Home
 */
const Home = () => {
    const { admin } = useAdminContext();
    const { member } = useMemberContext();
    const [userIsConnected, setUserIsConnected] = useState<boolean>();
    const [userIsChecked, setUserIsChecked] = useState<boolean>(false);
    const [line, setLine] = useState<0 | 1 | 2 |3 | 4>(0);

    useEffect(() => {
        if (admin || member) setUserIsConnected(true);
        else setUserIsConnected(false);
        setUserIsChecked(true);
    }, [admin, member]);

    const conceptLines = [
        "AgriGuilder est une application web qui permet de favoriser et gérer l'entraide au sein de votre collectif.",
        "En tant que membre de votre guilde, vous pouvez déclarer une intervention que vous aurez réalisée pour un autre membre.",
        "En déclarant une intervention, votre compteur de points augmente en fonction de la nature de l'intervention, ainsi que le nombre d'heures effectuées.",
        "Le membre qui aura bénéficié de votre intervention, quand à lui, verra son compteur de points diminuer de la même valeur.",
        "Ce système, sollicité à l'origine par un collectif agricole, vise à péréniser et équilibrer l'entraide entre chaque membre."
    ];

    const handleNextLine = () => {
        if (line === 0) setLine(1);
        if (line === 1) setLine(2);
        if (line === 2) setLine(3);
        if (line === 3) setLine(4);
        if (line === 4) setLine(0);
    }
    
    return (<>
        <section className={"section_left"} >
            <div id={"section_accueil"} className={"section_content"}>
                <Image className={"page_logo"} src={"/images/icons/logo-colors.svg"} alt={"logo"} width={120} height={184} priority/>
                <h2>{line === 0 ? "Bienvenue sur Agriguilder !" : "Le concept est simple"}</h2>
                <div id={"accueil_concept"}>
                    <p id={"lineDisplayer"}>
                        {conceptLines[line]}
                        {line === 0 && <>
                            <Image src={"/images/icons/arrow-white-right.svg"} alt={"en savoir plus"} width={30} height={30} onClick={() => handleNextLine()}/>
                        </>}
                    </p>
                    {line !=0 && <div id={"lineNav"}>
                        <div id={"lineSelector"}>
                            <Image src={`/images/icons/${line === 1 ? 'checked' : 'unchecked'}.svg`} alt={"line"} width={10} height={10} onClick={() => setLine(1)}/>
                            <Image src={`/images/icons/${line === 2 ? 'checked' : 'unchecked'}.svg`} alt={"line"} width={10} height={10} onClick={() => setLine(2)}/>
                            <Image src={`/images/icons/${line === 3 ? 'checked' : 'unchecked'}.svg`} alt={"line"} width={10} height={10} onClick={() => setLine(3)}/>
                            <Image src={`/images/icons/${line === 4 ? 'checked' : 'unchecked'}.svg`} alt={"line"} width={10} height={10} onClick={() => setLine(4)}/>
                        </div>
                        <Image src={"/images/icons/arrow-white-right.svg"} alt={"en savoir plus"} width={30} height={30} onClick={() => handleNextLine()}/>
                    </div>}
                </div>
                {userIsChecked && !userIsConnected && <div id={"accueil_navigation"}>
                    <UILink color={"dark"} href={"/connexion"}>
                        <Image src={"/images/icons/membre-white-dark.svg"} alt={"se connecter"} width={30} height={30}/>
                        <p>Se Connecter</p>
                    </UILink>
                </div>}
            </div>
        </section>
        {userIsChecked && userIsConnected && <section className={"section_right"} id={"section_menu"}>
            <div id={"section_accueil"} className={"section_content"}>
                <h2>Que souhaitez-vous faire ?</h2>
                <div id={"menu_list"}>
                    {member && <>
                    <Link className={"menu_1st_link"} href={"/declaration"}>
                        <Image src={"/images/icons/declaration-white-light.svg"} alt={"déclarer"} width={100} height={100}/>
                        <p>Déclarer</p>
                    </Link>
                    <Link className={"menu_2nd_link"} href={"/guilde"}>
                        <Image src={"/images/icons/guilde-white-light.svg"} alt={"guilde"} width={100} height={100}/>
                        <p>Soldes</p>
                    </Link>
                    <Link className={"menu_3rd_link"} href={"/historique"}>
                        <Image src={"/images/icons/historique-white-light.svg"} alt={"historique"} width={100} height={100}/>
                        <p>Historique</p>
                    </Link>

                    </>}
                    {admin && <>
                    <Link className={"menu_1st_link"} href={"/config"}>
                        <Image src={"/images/icons/outils-white-light.svg"} alt={"outils"} width={100} height={100}/>
                        <p>Outils</p>
                    </Link>
                    <Link className={"menu_2nd_link"} href={"/membres"}>
                        <Image src={"/images/icons/membres-white-light.svg"} alt={"membres"} width={100} height={100}/>
                        <p>Membres</p>
                    </Link>
                    <Link className={"menu_3rd_link"} href={"/arbitrage"}>
                        <Image src={"/images/icons/arbitrage-white-light.svg"} alt={"arbitrage"} width={100} height={100}/>
                        <p>Arbitrage</p>
                    </Link>
                    </>}
                    <Link className={"menu_4st_link"} href={"/options"}>
                        <Image src={"/images/icons/options-white-light.svg"} alt={"options"} width={150} height={100}/>
                        <p>Options</p>
                    </Link>
                    <Link className={"menu_5nd_link"} href={"/guildRules"}>
                        <Image src={"/images/icons/rules-white-light.svg"} alt={"règlement"} width={100} height={100}/>
                        <p>Règlement</p>
                    </Link>                                
                </div>
            </div>           
        </section>}
    </>)
}

export default Home;