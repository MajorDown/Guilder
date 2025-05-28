'use client'
import { useState } from "react"
import PageForManager from "@/components/manager/PageForManager"
import CreateGuildForm from "@/components/manager/createGuildForm";

const ManageGuildes = (): JSX.Element => {
    //state gérant l'affichage du formulaire de création de guilde
    const [showCreateGuildForm, setShowCreateGuildForm] = useState(false);

    return (
        <PageForManager id={""} title={"Résumé de l'activité des guildes"}>
            <>
                {!showCreateGuildForm && <button className={"light"} onClick={() => setShowCreateGuildForm(true)}>Créer une nouvelle guilde</button>}
                {showCreateGuildForm && <CreateGuildForm onClose={() => setShowCreateGuildForm(false)}/>}
                {!showCreateGuildForm && <>
                    <p>module affichant les data de chaque guilde</p>
                    <p>en cours de développement</p>
                </>}
            </>
        </PageForManager>
    )
}

export default ManageGuildes