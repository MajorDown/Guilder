import OperationsLister from "@/components/OperationsLister";

const Historic = () => {

  return (
    <section>
        <h2>Historique de vos opérations</h2>
        <p>Consultez ici l'historique des opérations vous concernant.</p>
        <p>*Dans le cas ou vous constatez une erreur de déclaration, vous avez 
          la possibilité de la contester si celle-ci date de maximum 7 jours.
        </p>
        <OperationsLister />
    </section>
  )
}

export default Historic;