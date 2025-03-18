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

    // id au format YYYYMMDDHHMMSSMMM
    const factureMonth = props.facture.id.slice(4, 6);
    const factureYear = props.facture.id.slice(0, 4);

    return <li className={style.factureCard}>
        <p>n°{props.facture.id}</p>
        <p>{props.facture.client.name}</p>
        <p>O1/{factureMonth}/{factureYear}</p>
        <p>{totalTTC}€</p>
        <button>📝</button>           
        <button>{props.facture.sentToClient ? StatusIcons['sentToClient'] : StatusIcons['!sentToClient']}</button>
        <button>
            {props.facture.status === "pending" && StatusIcons['pending']}
            {props.facture.status === "paid" && StatusIcons['paid']}
            {props.facture.status === "cancelled" && StatusIcons['cancelled']}
        </button>
    </li>
}

export default FactureCard;