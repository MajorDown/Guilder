import AppLink from "@/components/AppLink"

const Admin = () => {
  return (
    <section id="adminSection">
      <h2>Connectez-vous en tant qu'admin</h2>
      <div>
        <p>Vous souhaitez administrer votre propre guilde ?</p>
        <AppLink href={"/admin/signup"}>Créer votre guilde</AppLink>
      </div>
      
    </section>
  )
}

export default Admin;