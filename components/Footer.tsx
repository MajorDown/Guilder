import Link from "next/link";
const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <footer>
      <Link href="/mentions_legales">Mentions légales</Link>
      <Link href="/aide">Aide</Link>
      <p>~ Agriguilder ~ version 1.4 - copyright {year}</p>
    </footer>
  )
}

export default Footer;