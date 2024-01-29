import AdminSignupForm from "@/components/AdminSignupForm";

/**
 * @module Inscription
 */
const Inscription = () => {
    return (
      <section id="InscriptionSection">
        <h2>Vous souhaitez créer votre propre guilde ?</h2>
          <p>Vous êtes au bon endroit !</p>
          <p>Remplissez le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais.</p>
          <AdminSignupForm />       
      </section>
    )
  }
  
  export default Inscription;
