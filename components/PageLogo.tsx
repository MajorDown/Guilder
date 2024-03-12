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
            // si le pathname actuel est un pathname pour admin
            case "/membres":setLogoPath("/images/icons/membres-white-dark.svg"); break;
            case "/config": setLogoPath("/images/icons/outils-white-dark.svg"); break;
            case "/arbitrage": setLogoPath("/images/icons/arbitrage-white-dark.svg"); break;
            // si le pathname actuel est un pathname pour membre
            case "/declaration": setLogoPath("/images/icons/declaration-white-dark.svg"); break;
            case "/historique": setLogoPath("/images/icons/historique-white-dark.svg"); break;
            case "/guilde": setLogoPath("/images/icons/guilde-white-dark.svg"); break;
            // si le pathname actuel est "/options"
            case "/options": setLogoPath("/images/icons/options-white-dark.svg"); break;
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