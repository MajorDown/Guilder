import Image from "next/image"
import LinkButton from "@/components/landing/UI/LinkButton"

const Header = ():JSX.Element => {
    return (<header>
        <h1>Agriguilder.</h1>
        <Image
            src="/images/icons/logo-colors.svg"
            alt="Agriguilder Logo"
            width={50}
            height={75}
        />
        <LinkButton color={'dark'} />
    </header>)
}

export default Header