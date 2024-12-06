import AdminSignupForm from "@/components/AdminSignupForm";

/**
 * @module Inscription
 */
const Inscription = () => {
    return (
      <section className="section_left" >
        <div id={"section_inscription"}>
          <h2>Vous souhaitez créer une nouvelle guilde ?</h2>
          <p>Vous êtes au bon endroit !</p>
          <p>Veuillez remplir le formulaire ci-dessous</p>
          <AdminSignupForm />  
        </div>
     
      </section>
    )
  }
  
  export default Inscription;
