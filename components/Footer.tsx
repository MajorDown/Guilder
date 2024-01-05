import AppLink from "./AppLink";

const Footer = () => {
  return (
    <footer>
      <p>Guilder copyright 2024</p>
      <AppLink href={"/admin/signup"}> Créez votre propre guilde !</AppLink>
      <AppLink href={"/admin"} showActivation>Administrer votre guilde</AppLink>
    </footer>
  )
}

export default Footer;