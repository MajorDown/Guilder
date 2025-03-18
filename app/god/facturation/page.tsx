'use client'
import {useState, useEffect} from 'react';
import { Facture } from '@/types';
import FactureCard from '@/components/god/factureCard';
import PageForGod from '@/components/god/PageForGod';
import getAllFactures from '@/tools/front/getAllFactures';
import FactureLister from '@/components/god/FactureLister';

const GodFacturationPage = () => {
    const [guildsFacturations, setGuildsFacturations] = useState<Facture[]>([]);
    const [FacturationsErr, setFacturationsErr] = useState<string>("");

    // SI LE GOD EST CONNECTE, RECHERCHE DES FACTURES DES GUILDS
    useEffect(() => {
        if (sessionStorage.getItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string) !== "true") {
            // rediriger vers la page /god/login
            window.location.href = "/god/login";
        }
        else getAllFactures()
            .then((data) => setGuildsFacturations(data))
            .catch((err) => setFacturationsErr("erreur lors du chargement des factures"));
    }, []);

    return (
        <PageForGod title={"Facturation"} id={"sectionFacturation"}>
            <>
                <FactureLister factures={guildsFacturations} />
                {FacturationsErr && <p>{FacturationsErr}</p>}
            </>
        </PageForGod>
    )  
}

export default GodFacturationPage;