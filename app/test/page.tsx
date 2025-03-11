"use client";

import PageForUser from "@/components/PageForUser";
import dynamic from "next/dynamic";
import FacturePDF from "@/components/pdf/Facture";
import { Facture } from "@/types";

// Importation dynamique pour empêcher le chargement côté serveur
const PDFViewer = dynamic(() => import("@react-pdf/renderer").then(mod => mod.PDFViewer), { 
  ssr: false 
});

// Données pour la facture
const factureData: Facture = {
    id: '20210701120000001',
    client: {
        name: 'CUMA de la Vallée',
        adress: {
            line1: '5 rue de la Vallée',
            city: 'Paris',
            country: 'France',
            code: 75001,
        },
        phone: '01 23 45 67 89',
        mail: 'contact@test.fr'
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
};

const Test = () => {
    return (
        <PageForUser title="tests d'intégration" id="section_test">  
            <PDFViewer width="95%" height="600px">
                <FacturePDF factureData={factureData} />
            </PDFViewer>
        </PageForUser>
    );
};

export default Test;
