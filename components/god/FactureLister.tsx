import { Facture } from "@/types";
import style from '@/styles/components/FactureLister.module.css';
import FactureCard from '@/components/god/factureCard';

type FactureListerProps = {
    factures: Facture[];
}

const FactureLister = (props: FactureListerProps):JSX.Element => {
    return (<ul className={style.factureLister}>
        {props.factures.map((facture) => <FactureCard facture={facture} key={facture.id} />)}
    </ul>)
}

export default FactureLister;