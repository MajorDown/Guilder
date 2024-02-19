import Image from 'next/image';
import Link from 'next/link';
import { Amatic_SC } from 'next/font/google';
import AppNavbar from './AppNavbar';
import Welcomer from './Welcomer';

const titleFont = Amatic_SC({weight: "400", subsets: ["latin"], display: 'swap', variable: "--Amatic-SC"});

const Header = () => {

  return (
    <header>
      <Link id="appTitle" href={"/"}>
        <h1 className={titleFont.className}>Guilder</h1>
        <Image src="/images/logo.png" alt="logo" width={200} height={94} priority/>
      </Link>
      <div id="appOptions">
        <Welcomer />     
        <nav id="appNavbar">
          <AppNavbar />
        </nav>
      </div>
    </header>
  )
}

export default Header;