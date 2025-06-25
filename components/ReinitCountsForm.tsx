import { useRef, useState } from "react"
import { useAdminContext } from "@/contexts/adminContext";
import UIPasswordInput from "@/components/UI/UIPasswordInput"
import UISelectInput from "./UI/UISelectInput";
import resetGuildsCounts from "@/tools/front/reinitGuildCounts";
import LoadSpinner from "./LoadSpinner";


const ReinitCountsForm = ():JSX.Element => {
    const {admin} = useAdminContext();

    const passwordRef = useRef<HTMLInputElement>(null);
    const historyRef = useRef<HTMLSelectElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>("");
    const [isActualised, setIsActualised] = useState<boolean>(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        if (!admin) {
            setErrMessage("Vous devez être connecté pour effectuer cette action.");
            return;
        }
        const password = passwordRef.current?.value;       
        if (!password) {
            setErrMessage("Veuillez renseigner votre mot de passe.");
            return;
        }       
        const history = historyRef.current?.value;
        if (history !== "keep" && history !== "delete") {
            setErrMessage("Veuillez choisir une option pour l'historique des interventions.");
            return;
        }
        try {
            const response = await resetGuildsCounts({
                admin: admin,
                reAskedPassword: password,
                wantToResetInterventions: history === "delete"
            });
            setIsActualised(true);
            setIsLoading(false);
            setErrMessage("");
            //rechargement de la page
            setTimeout(() => {
                window.location.reload();
            }, 5000);
            return;
        } catch (error) {
            setErrMessage('error :' + error);
        }
        setIsLoading(false);
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
        <button className={"green"} onClick={() => {handleSubmit()}}>Réinitialiser les compteurs</button>
        {errMessage && <p className={"error"}>{errMessage}</p>}
        {isLoading && <LoadSpinner message={"Réinitialisation en cours..."} />}
        {isActualised && <LoadSpinner message={"La réinitialisation a réussie ! Veuilez patienter..."} />}
    </div>
}

export default ReinitCountsForm