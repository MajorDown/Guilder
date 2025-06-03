import Image from "next/image"
import LinkButton from "@/components/landing/UI/LinkButton"

const Header = ():JSX.Element => {
    return (<header>
        <p id={'headerTitle'}>Agriguilder.</p>
        <Image
            src="/images/icons/logo-colors.svg"
            alt="Agriguilder Logo"
            width={50}
            height={75}
        />
        <div>
            <LinkButton color={'dark'} text={"Découvrir l'outil"} />
        </div>
    </header>)
}

export default Header