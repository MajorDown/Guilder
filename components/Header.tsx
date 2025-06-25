import Image from 'next/image';
import Link from 'next/link';
import Welcomer from './Welcomer';

const Header = () => {
  return (
    <header>
      <Link id="appTitle" href={"/"}>
        <Image src="/images/icons/logo-white.svg" alt="logo" width={60} height={92} priority/>
        <h1>Agriguilder</h1>
      </Link>
      <Welcomer />     
    </header>
  )
}

export default Header;