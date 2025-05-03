import {Facture, Package, StatusIcons} from '@/types';
import style from "@/styles/components/FactureCard.module.css";
import {TVA, packages} from '@/constants';

type FactureCardProps = {
    facture: Facture
}

const FactureCard = (props: FactureCardProps): JSX.Element => {

    const currentpackage: Package = packages[props.facture.client.currentPackageId];
    const quantity = props.facture.client.currentPeriod === "monthly" ? 1 : 12;
    const totalHT = currentpackage.price * quantity;
    const totalTTC = totalHT * (1 + TVA / 100);

    const factureMonth = props.facture.id.slice(4, 6);
    const factureYear = props.facture.id.slice(2, 4);

    const handleSent = async () => {
        const sendFactureByMail = await fetch(`/api/sendFactureByMail/${props.facture.id}`);
    }

    const handleSetIsPaid = () => {
        // changer le statut de la facture
    }

    return <li className={style.factureCard}>
        <p>n°{props.facture.id}</p>
        <p>{props.facture.client.name}</p>
        <p>01/{factureMonth}/{factureYear}</p>
        <p>{totalTTC}€</p>    
        <button onClick={() => handleSent()}>Envoyer</button>
        <button onClick={() => handleSetIsPaid()}>
            {props.facture.status === 'paid' ? "Valider" : "Annuler"}
        </button>
        <p>
            {props.facture.sentToClient ? StatusIcons['sentToClient'] : StatusIcons['!sentToClient']}
            {props.facture.status === "pending" && StatusIcons['pending']}
            {props.facture.status === "paid" && StatusIcons['paid']}
        </p>
    </li>
}

export default FactureCard;