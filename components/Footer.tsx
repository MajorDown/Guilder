import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <Link href="/mentions_legales">Mentions légales</Link>
      <Link href="/aide">Aide</Link>
      <p>~ Agriguilder ~ version 1.3.4 - copyright 2024</p>
    </footer>
  )
}

export default Footer;