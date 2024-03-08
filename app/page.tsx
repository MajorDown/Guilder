import Link from "next/link";
import Image from "next/image";
import UILink from "@/components/UI/UILink";

/**
 * @module Home
 */
const Home = () => {
  return (
    <section id={"section_accueil"}>
      <h2>Bienvenue sur Guilder !</h2>
      <div id={"accueil_explications"}>
        <p>Guilder est une application web qui permet de favoriser et gérer l'entraide au sein de votre collectif.</p>
        <Link href={"/"}><Image src={"/images/icons/arrow-white-right.svg"} alt={"en savoir plus"} width={40} height={40}/></Link>
      </div>
      <div id={"accueil_navigation"}>
        <UILink color={"green"} href={"/inscription"}>
          <Image src={"/images/icons/guilde-white-dark.svg"} alt={"creer sa guilde"} width={30} height={30}/>
          <p>Créer sa guilde</p>
        </UILink>
        <UILink color={"dark"} href={"/connexion"}>
          <Image src={"/images/icons/membre-white-dark.svg"} alt={"se connecter"} width={30} height={30}/>
          <p>Se Connecter</p>
        </UILink>
      </div>
    </section>
  )
}

export default Home;

{/* <p>Le concept est simple : En tant que membre de votre guilde, vous pouvez déclarer une intervention que vous aurez réalisée pour un autre membre.</p>
<p>En déclarant une intervention, votre compteur de points augmente en fonction de la nature de l'intervention, ainsi que le nombre d'heures effectuées.</p>
<p>Le membre qui aura bénéficié de votre intervention, quand à lui, verra son compteur de points diminuer de la même valeur.</p>
<p>Ce système, sollicité à l'origine par un collectif agricole, vise à péréniser et équilibrer l'entraide entre chaque membre.</p> */}