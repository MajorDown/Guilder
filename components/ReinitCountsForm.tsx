import { useRef, useState } from "react"
import UIPasswordInput from "@/components/UI/UIPasswordInput"
import UISelectInput from "./UI/UISelectInput";


const ReinitCountsForm = ():JSX.Element => {
    const passwordRef = useRef<HTMLInputElement>(null);
    const historyRef = useRef<HTMLSelectElement>(null);
    const [errMessage, setErrMessage] = useState<string>("");
    const [isActualised, setIsActualised] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const request = {
            lastPassword: passwordRef.current?.value,
            history: historyRef.current?.value
        }
        // Call the API to reinitialize counts
        // Handle response and set isActualised or errMessage accordingly
    }

    return <div id={"reinitCountsForm"}>
        <h3>Vous souhaitez réinitialiser les compteurs de la guilde ?</h3>
        <div>
            <p>Il s'agit de remettre à 0 les compteurs de chaque membres de la guilde, sans exception.</p>
            <p>Vous pouvez choisir de conserver l'historique des interventions, ou de les supprimer également.</p>
            <p>Cette action est irréversible.</p>                    
        </div>
        <div className={"wrapper-vertical"}>
            <label htmlFor="reinitCounts">Souhaitez-vous supprimer également l'historique des interventions ?</label>
            <UISelectInput
                name="reinitCounts"
                options={[
                    {value: "keep", name: "Conserver"},
                    {value: "delete", name: "Supprimer"}
                ]}
                defaultValue="keep"
                inputRef={historyRef}
            /> 
        </div>   
        <div className={"wrapper-vertical"}>
            <label htmlFor="lastPassword">Renseignez votre mot de passe :</label>
            <UIPasswordInput name="lastPassword" inputRef={passwordRef} />
        </div>
    </div>
}

export default ReinitCountsForm