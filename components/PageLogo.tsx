import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

type PageLogoProps = {
    pseudoTitle?: string;
}

/**
 * @module PageLogo
 * 
 * Affiche le logo et le pseudo-titre de la page actuelle, ainsi qu'un lien pour revenir à la page d'accueil.
 */
const PageLogo = (props: PageLogoProps) => {
    const router = useRouter();
    const actualPathName = usePathname();
    const [logoPath, setLogoPath] = useState<string>("");

    useEffect(() => {
        if (actualPathName.includes("/arbitrage")) {
            setLogoPath("/images/icons/arbitrage-white-dark.svg");
        } 
        else if (actualPathName.includes("/contestation")) {
            setLogoPath("/images/icons/signaler.svg");
        }
        else {
            switch (actualPathName) {
                // si le pathname actuel est un pathname pour admin
                case "/membres":
                    setLogoPath("/images/icons/membres-white-dark.svg");
                    break;
                case "/config":
                    setLogoPath("/images/icons/outils-white-dark.svg");
                    break;
                // si le pathname actuel est un pathname pour membre
                case "/declaration":
                    setLogoPath("/images/icons/declaration-white-dark.svg");
                    break;
                case "/historique":
                    setLogoPath("/images/icons/historique-white-dark.svg");
                    break;
                case "/guilde":
                    setLogoPath("/images/icons/guilde-white-dark.svg");
                    break;
                // si le pathname actuel est "/options"
                case "/options":
                    setLogoPath("/images/icons/options-white-dark.svg");
                    break;
                // si le pathname actuel est "/guildRules"
                case "/guildRules":
                    setLogoPath("/images/icons/rules-white-dark.svg");
                    break;
                // si le pathname actuel est "/aide"
                case "/aide":
                    setLogoPath("/images/icons/aide-green.svg");
                    break;
                default:
                    setLogoPath("/images/logo.svg");
                    break;
            }
        }
    }, [actualPathName]);
    
    return (
        <div id={"pageLogo"}>
            {logoPath != "" && <Image className={"page_logo"} src={logoPath} alt="Logo de la page" width={300} height={150} priority/>}
            <p className={"pseudoTitle"}>{props.pseudoTitle}</p>
            {actualPathName != "/" && <Link href="/">
                <Image src="/images/arrow_back.svg" alt="retour à l'accueil" width={40} height={40} />
                <p>Retour à la page d'accueil</p>
            </Link>}
        </div>
  )
}

export default PageLogo;