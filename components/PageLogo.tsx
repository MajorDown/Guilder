import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const PageLogo = () => {
    const router = useRouter();
    const actualPathName = usePathname();
    const [logoPath, setLogoPath] = useState<string>("");

    useEffect(() => {
        switch (actualPathName) {
            //si le pathname actuel est "/", logopath sera égal à "/images/logo.svg"
            case "/": setLogoPath("/images/logo.svg"); break;
            // si le pathname actuel est un pathname pour admin
            case "/membres":setLogoPath("/images/guild.svg"); break;
            case "/config": setLogoPath("/images/tools.svg"); break;
            case "/arbitrage": setLogoPath("/images/justice.svg"); break;
            // si le pathname actuel est un pathname pour membre
            case "/declaration": setLogoPath("/images/new-intervention.svg"); break;
            case "/historique": setLogoPath("/images/stats.svg"); break;
            case "/guilde": setLogoPath("/images/guild.svg"); break;
            // si le pathname actuel est "/options"
            case "/options": setLogoPath("/images/options.svg"); break;
            default: setLogoPath("/images/logo.svg"); break;
        }


    }, [actualPathName])
    
    return (
        <section id={"pageLogo"}>
            <Image src={logoPath} alt="Logo de la page" max-width={200} height={100} />
            {actualPathName != "/" && <Link href="/">
                <Image src="/images/arrow_back.svg" alt="retour à l'accueil" width={40} height={40} />
                <p>Retour à la page d'accueil</p>
            </Link>}
        </section>
  )
}

export default PageLogo;