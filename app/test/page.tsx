import PageForUser from "@/components/PageForUser"
//importations nécessaires pour l'affichage dun document pdf
import {PDFViewer} from '@react-pdf/renderer';
import FacturePDF from "@/components/pdf/Facture";
import { Facture } from "@/types";

//données pour la facture
const factureData: Facture = {
    id: '2021-07-01-12-00-00-001',
    client: {
        name: 'CUMA de la Vallée',
        adress: {
            line1: '5 rue de la Vallée',
            city: 'Paris',
            country: 'France',
            code: 75001,
        },
    },
    package: {
        id: 3,
        rules: {
            min: 10,
            max: 20
        },
        price: 100
    },
    period: 'annual',
    firstMonth: '07'
}

const MentionsLegales = () => {
    return (<PageForUser title="tests d'intégration" id="section_test">  
        <div>kikou</div>
        <PDFViewer>
            <FacturePDF factureData={factureData} />
        </PDFViewer>
    </PageForUser>);
};

export default MentionsLegales;
