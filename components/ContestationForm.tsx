import { ConnectedMember, Contestation, Intervention } from '@/types'
import {useState, FormEvent} from 'react'
import UIButton from './UI/UIButton'
import { dateGenerator } from '@/tools/dateGenerator'
import createContestation from '@/tools/front/createContestation'
import LoadSpinner from './LoadSpinner'

export type ContestationFormProps = {
    contestedIntervention: Intervention,
    member: ConnectedMember
}

/**
 * @function ContestationForm
 * @description Composant pour un formulaire de contestation.
 * @param {ContestationFormProps} props - Les props du composant.
 * @param {Intervention} props.contestedIntervention - L'intervention contestée.
 * @param {ConnectedMember} props.member - Le membre connecté.
 * 
 * @returns {JSX.Element} Un formulaire de contestation.
 */
const ContestationForm = (props : ContestationFormProps) => {
    const [contesterMessage, setContesterMessage] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);
    const [hasSent, setHasSent] = useState<boolean>(false);
    const [sendingError, setSendingError] = useState<boolean>(false);

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const confirmation = window.confirm("Êtes-vous sûr de vouloir envoyer cette contestation ?");
        if (confirmation) {
            setIsSending(true);
            const request: Contestation = {
                contestationDate: dateGenerator("declaration"),
                contester: props.member.name,
                contesterMessage: contesterMessage,
                contestedIntervention: props.contestedIntervention,
                adminConclusion: "en attente",
                adminMessage: "",
                guild: props.member.guild
            }
            const response = await createContestation(request, props.member);
            if (response != undefined) {
                setIsSending(false);
                setHasSent(true);
                setContesterMessage("");
            }
            else setSendingError(true);
        }
    }
    
    return (
        <>
            {!isSending && !hasSent && <form id={"contestationForm"} className={"scrollable"} onSubmit={(event) => handleSubmit(event)}>
                <p>Vous contestez la déclaration suivante :</p>
                <p>le {props.contestedIntervention.interventionDate},</p>
                <p><b>{props.contestedIntervention.worker}</b></p>
                <p>a déclaré une intervention au service de</p>
                <p><b>{props.contestedIntervention.payer}</b></p>
                <p>pour une durée de <b>{props.contestedIntervention.hours} heures</b>.</p>
                <p>Les options qui ont été ajoutées sont :</p>
                {props.contestedIntervention.options[0] ? 
                    props.contestedIntervention.options.map((option, index) => {
                        if (typeof option != 'string') return <p key={index}><b>+ {option.option} (x{option.coef})</b></p> 
                    }) : <p>pas d'options enregistrées</p>
                }
                <p>Description de l'intervention:</p>
                <p><b>"{props.contestedIntervention.description}"</b></p>
                <p>ID de la déclaration: <b>"{props.contestedIntervention.declarationDate}"</b></p>
                <label htmlFor="contesterMessage">
                    <p>Décrivez ci-desssous clairement pourquoi vous contestez cette déclaration :</p>
                    <p>nombre d'heures incorrect, liste d'option incorrecte, erreur sur le nom des membres concernés...</p>
                    <p>(n'hésitez pas à contacter le membre qui à fait la déclaration pour en savoir plus sur la raison de l'erreur)</p>
                    </label>
                <textarea 
                    placeholder='expliquez ici clairement votre contestation... (500 caractères maximum)'
                    id="contesterMessage" 
                    name="contesterMessage" 
                    rows={5}
                    cols={50}
                    maxLength={500}
                    value={contesterMessage}
                    onChange= {(event) => setContesterMessage(event.target.value)}
                    required>
                </textarea>
                <button className={"light"} type="submit">Envoyer la contestation</button>
                {sendingError && <p>Une erreur est survenue lors de l'envoi de votre déclaration. Veuillez réessayer plus tard.</p>}
                {isSending && <>
                    <p>Envoi de la contestation en cours...</p>
                    <LoadSpinner />
                </>}
            </form>}
            {hasSent && <>
                <p>Votre contestation a bien été envoyée !</p>
                <p>Soyez assuré qu'elle sera traité par l'un des administrateurs de votre guilde dans les plus bref délais</p>
                <p>Son status ("accordé", "refusé" ou "en attente") sera mis à jour en temps réel dans l'onglet "options"</p>
            </>}
        </>
  )
}

export default ContestationForm;