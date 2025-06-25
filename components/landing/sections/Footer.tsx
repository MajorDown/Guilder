import Image from "next/image";
import Link from "next/link";

const Footer = (): JSX.Element => {
    return (<footer>
        <div className={"footerColumn"}>
            <h3>Agriguilder.</h3>
            <p id={'credits'}>Création du site : <Link href="https://mok-communication.com/">MoK Communication</Link> & <Link href="https://romainfouillarondev.fr/">Romain Fouillaron</Link></p>
        </div>
        <div className={"footerColumn"}>
            <Image
                id={'footerLogo'}
                src="/images/landing/desktop/logo_white.webp"
                alt="Agriguilder Logo"
                width={173/2}
                height={267/2}
            />
            <p id={'copyright'}>© Copyright 2025 - Tout droit réservé</p>
        </div>
        <div className={"footerColumn"}>
            <div id={"socials"}>
                <p>Nous suivre</p>
                <Image
                    src="/images/landing/desktop/social_facebook.png"
                    alt="Facebook"
                    width={48}
                    height={48}
                />
                <Image
                    src="/images/landing/desktop/social_instagram.png"
                    alt="Instagram"
                    width={48}
                    height={48}
                />
                <Image
                    src="/images/landing/desktop/social_linkedin.png"
                    alt="LinkedIn"
                    width={48}
                    height={48}
                />
            </div>
            <Link id={'legals'} href={"/mentions_legales"}>Mentions légales & Politique de confidentialité</Link>
        </div>
    </footer>)
}

export default Footer;